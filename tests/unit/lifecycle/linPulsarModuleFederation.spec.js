import {
  getInstance,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import { createPinia, setActivePinia } from 'pinia';
import { linPulsarModuleFederation } from 'src/lifecycle/linPulsarModuleFederation';
import * as federationService from 'src/services/federationService';
import * as i18nService from 'src/services/i18nService';
import * as linPulsarModuleConfigurationService from 'src/services/linPulsarModuleConfigurationService';
import * as localComponentService from 'src/services/localComponentService';
import * as nunjucksService from 'src/services/nunjucksService';
import * as piniaStoreService from 'src/services/piniaStoreService';
import { useLinPulsarZoneStore } from 'src/stores/linPulsarZoneStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@module-federation/enhanced/runtime', () => ({
  getInstance: vi.fn(),
  registerRemotes: vi.fn(),
}));

vi.mock('src/services/federationService', () => ({
  getModuleFederation: vi.fn(),
  setModuleFederation: vi.fn(),
}));

vi.mock('src/services/i18nService', () => ({
  getI18nInstance: vi.fn(),
}));

vi.mock('src/services/linPulsarModuleConfigurationService', () => ({
  registerModuleHostConfiguration: vi.fn(),
}));

vi.mock('src/services/localComponentService', () => ({
  getLocalComponent: vi.fn(),
  registerLocalComponents: vi.fn(),
}));

vi.mock('src/services/nunjucksService', () => ({
  getNunjucksEnv: vi.fn(),
}));

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

describe('Test object: linPulsarModuleFederation', () => {
  const config = {
    instanceId: 'test-module',
    remoteName: 'testModule',
    lifecycleRemote: 'testModule/lifecycle',
    routesRemote: 'testModule/routes',
    i18nRemote: 'testModule/i18n',
    basePath: '/test-module',
    zones: [],
  };
  const remotes = [{ name: 'testModule', entry: '/testModule/manifest.json' }];
  const modules = ['/modules/test.json'];

  let pinia;
  let loadRemote;
  let setLocaleMessage;
  let router;
  let remoteModule;
  let federationInstance;

  /**
   * Mocks a fetch implementation serving one module configuration file.
   * @param moduleConfig - The module configuration returned for /modules/test.json.
   */
  function stubFetch(moduleConfig) {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url) => ({ ok: true, url, json: async () => moduleConfig }))
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);

    remoteModule = {
      setup: vi.fn(async () => ({ success: true })),
      configure: vi.fn(async () => ({ success: true })),
      initialize: vi.fn(async () => ({ success: true })),
      ready: vi.fn(async () => ({ success: true })),
      postInit: vi.fn(async () => ({ success: true })),
    };

    loadRemote = vi.fn(async (remote) => {
      if (remote === 'testModule/lifecycle') {
        return { default: remoteModule };
      }
      if (remote === 'testModule/routes') {
        return { default: [] };
      }
      return { default: {} };
    });
    federationInstance = { loadRemote };
    vi.mocked(getInstance).mockReturnValue(federationInstance);
    vi.mocked(federationService.getModuleFederation).mockReturnValue(
      federationInstance
    );

    setLocaleMessage = vi.fn();
    vi.mocked(i18nService.getI18nInstance).mockReturnValue({
      global: {
        messages: { value: { 'en-US': { existing: 'kept' } } },
        setLocaleMessage,
      },
    });

    vi.mocked(nunjucksService.getNunjucksEnv).mockReturnValue({
      renderString: vi.fn((template) => template),
    });

    router = {
      hasRoute: vi.fn(() => false),
      removeRoute: vi.fn(),
      addRoute: vi.fn(),
    };
  });

  describe('Test function: init', () => {
    it('should register remotes and share the federation instance with the lin-pulsar-core', async () => {
      stubFetch(config);

      await linPulsarModuleFederation.init({ router, remotes, modules });

      expect(registerRemotes).toHaveBeenCalledWith(remotes);
      expect(federationService.setModuleFederation).toHaveBeenCalledWith(
        federationInstance
      );
    });

    it('should register the provided host-local components', async () => {
      stubFetch(config);
      const localComponents = {
        MyLocalComponent: { name: 'MyLocalComponent' },
      };

      await linPulsarModuleFederation.init({
        router,
        remotes,
        modules,
        localComponents,
      });

      expect(
        localComponentService.registerLocalComponents
      ).toHaveBeenCalledWith(localComponents);
    });

    it('should not register local components when none are provided', async () => {
      stubFetch(config);

      await linPulsarModuleFederation.init({ router, remotes, modules });

      expect(
        localComponentService.registerLocalComponents
      ).not.toHaveBeenCalled();
    });

    it('should run all lifecycle phases in order for a loaded module', async () => {
      stubFetch(config);

      await linPulsarModuleFederation.init({ router, remotes, modules });

      expect(loadRemote).toHaveBeenCalledWith('testModule/lifecycle');
      expect(
        linPulsarModuleConfigurationService.registerModuleHostConfiguration
      ).toHaveBeenCalledWith(config);
      expect(remoteModule.setup).toHaveBeenCalledTimes(1);
      expect(remoteModule.configure).toHaveBeenCalledWith(config);
      expect(remoteModule.initialize).toHaveBeenCalledWith(config);
      expect(remoteModule.ready).toHaveBeenCalledWith(config);
      expect(remoteModule.postInit).toHaveBeenCalledWith(config);

      const order = [
        remoteModule.setup,
        remoteModule.configure,
        remoteModule.initialize,
        remoteModule.ready,
        remoteModule.postInit,
      ].map((hook) => hook.mock.invocationCallOrder[0]);
      expect(order).toEqual([...order].sort((a, b) => a - b));
    });

    it('should fetch each provided module configuration file', async () => {
      const fetchMock = vi.fn(async () => ({ ok: false }));
      vi.stubGlobal('fetch', fetchMock);

      await linPulsarModuleFederation.init({
        router,
        remotes,
        modules: ['/modules/a.json', '/modules/b.json'],
      });

      expect(fetchMock).toHaveBeenCalledWith('/modules/a.json');
      expect(fetchMock).toHaveBeenCalledWith('/modules/b.json');
    });

    it('should skip and log a module whose configuration file fails to load', async () => {
      const errorSpy = vi
        .spyOn(globalThis.console, 'error')
        .mockImplementation(() => {});
      vi.stubGlobal(
        'fetch',
        vi.fn(async () => ({ ok: false, status: 404 }))
      );

      await linPulsarModuleFederation.init({ router, remotes, modules });

      expect(loadRemote).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(
        `[LinPulsar Core] Failed to load file: ${modules[0]} (HTTP 404)`
      );
      errorSpy.mockRestore();
    });

    it('should skip a module whose configuration file holds an invalid configuration', async () => {
      const files = {
        '/modules/no-lifecycle.json': { ...config, lifecycleRemote: undefined },
        '/modules/bad-ref.json': {
          ...config,
          lifecycleRemote: { type: 'component' },
        },
        '/modules/bad-zones.json': { ...config, zones: ['bad'] },
      };
      vi.stubGlobal(
        'fetch',
        vi.fn(async (url) => ({ ok: true, url, json: async () => files[url] }))
      );

      await linPulsarModuleFederation.init({
        router,
        remotes,
        modules: Object.keys(files),
      });

      expect(loadRemote).not.toHaveBeenCalled();
    });

    it('should register module routes on the router, replacing existing ones', async () => {
      stubFetch(config);
      loadRemote.mockImplementation(async (remote) => {
        if (remote === 'testModule/lifecycle') {
          return { default: remoteModule };
        }
        if (remote === 'testModule/routes') {
          return {
            default: [
              {
                name: 'test-route',
                path: '/test-module',
                component: 'testModule/Page',
              },
            ],
          };
        }
        return { default: {} };
      });
      router.hasRoute = vi.fn(() => true);

      await linPulsarModuleFederation.init({ router, remotes, modules });

      expect(router.removeRoute).toHaveBeenCalledWith('test-route');
      expect(router.addRoute).toHaveBeenCalledTimes(1);
      expect(router.addRoute.mock.calls[0][0]).toMatchObject({
        name: 'test-route',
        path: '/test-module',
      });
    });

    it('should merge module i18n messages into the host i18n instance', async () => {
      stubFetch(config);
      loadRemote.mockImplementation(async (remote) => {
        if (remote === 'testModule/lifecycle') {
          return { default: remoteModule };
        }
        if (remote === 'testModule/i18n') {
          return { default: { 'en-US': { added: 'value' } } };
        }
        return { default: [] };
      });

      await linPulsarModuleFederation.init({ router, remotes, modules });

      expect(setLocaleMessage).toHaveBeenCalledWith('en-US', {
        added: 'value',
        existing: 'kept',
      });
    });

    it('should load elements referenced by federated entries through module federation', async () => {
      stubFetch({
        ...config,
        lifecycleRemote: { type: 'federated', plugin: 'testModule/lifecycle' },
      });

      await linPulsarModuleFederation.init({ router, remotes, modules });

      expect(loadRemote).toHaveBeenCalledWith('testModule/lifecycle');
      expect(remoteModule.setup).toHaveBeenCalledTimes(1);
    });

    it('should resolve elements referenced by component entries against local components', async () => {
      stubFetch({
        ...config,
        lifecycleRemote: { type: 'component', component: 'localLifecycle' },
        routesRemote: { type: 'component', component: 'localRoutes' },
        i18nRemote: { type: 'component', component: 'localI18n' },
      });
      const locals = {
        localLifecycle: remoteModule,
        localRoutes: [
          { name: 'local-route', path: '/local', component: 'localPage' },
        ],
        localI18n: { 'en-US': { added: 'value' } },
      };
      vi.mocked(localComponentService.getLocalComponent).mockImplementation(
        (name) => locals[name]
      );

      await linPulsarModuleFederation.init({ router, remotes, modules });

      expect(loadRemote).not.toHaveBeenCalled();
      expect(remoteModule.setup).toHaveBeenCalledTimes(1);
      expect(router.addRoute.mock.calls[0][0]).toMatchObject({
        name: 'local-route',
        path: '/local',
      });
      expect(setLocaleMessage).toHaveBeenCalledWith('en-US', {
        added: 'value',
        existing: 'kept',
      });
    });

    it('should reject when a component entry references an unregistered local component', async () => {
      stubFetch({
        ...config,
        lifecycleRemote: { type: 'component', component: 'missing' },
      });
      vi.mocked(localComponentService.getLocalComponent).mockReturnValue(
        undefined
      );

      await expect(
        linPulsarModuleFederation.init({ router, remotes, modules })
      ).rejects.toThrow('Local component "missing" is not registered');
    });

    it('should load a federated route component referenced by a string', async () => {
      stubFetch(config);
      const pageComponent = { name: 'RemotePage' };
      loadRemote.mockImplementation(async (remote) => {
        if (remote === 'testModule/lifecycle') {
          return { default: remoteModule };
        }
        if (remote === 'testModule/routes') {
          return {
            default: [{ path: '/test-module', component: 'testModule/Page' }],
          };
        }
        if (remote === 'testModule/Page') {
          return { default: pageComponent };
        }
        return { default: {} };
      });

      await linPulsarModuleFederation.init({ router, remotes, modules });

      const record = router.addRoute.mock.calls[0][0];
      await expect(record.component()).resolves.toBe(pageComponent);
      expect(loadRemote).toHaveBeenCalledWith('testModule/Page');
    });

    it('should resolve a route component through a config expression holding a component entry', async () => {
      stubFetch({
        ...config,
        options: { page: { type: 'component', component: 'localPage' } },
      });
      loadRemote.mockImplementation(async (remote) => {
        if (remote === 'testModule/lifecycle') {
          return { default: remoteModule };
        }
        if (remote === 'testModule/routes') {
          return {
            default: [
              { path: '/test-module', component: '{{ config.options.page }}' },
            ],
          };
        }
        return { default: {} };
      });
      const pageComponent = { name: 'LocalPage' };
      vi.mocked(localComponentService.getLocalComponent).mockReturnValue(
        pageComponent
      );

      await linPulsarModuleFederation.init({ router, remotes, modules });

      const record = router.addRoute.mock.calls[0][0];
      await expect(record.component()).resolves.toBe(pageComponent);
      expect(localComponentService.getLocalComponent).toHaveBeenCalledWith(
        'localPage'
      );
    });

    it('should reject a route component whose federated element exposes nothing', async () => {
      stubFetch(config);
      loadRemote.mockImplementation(async (remote) => {
        if (remote === 'testModule/lifecycle') {
          return { default: remoteModule };
        }
        if (remote === 'testModule/routes') {
          return {
            default: [{ path: '/test-module', component: 'testModule/Page' }],
          };
        }
        if (remote === 'testModule/Page') {
          return {};
        }
        return { default: {} };
      });

      await linPulsarModuleFederation.init({ router, remotes, modules });

      const record = router.addRoute.mock.calls[0][0];
      await expect(record.component()).rejects.toThrow('could not be loaded');
    });

    it('should register configured zones as components or federated plugins', async () => {
      stubFetch({
        ...config,
        zones: [
          { zone: 'header', component: 'LocalComponent' },
          { zone: 'footer', plugin: 'testModule/RemoteComponent' },
        ],
      });

      await linPulsarModuleFederation.init({ router, remotes, modules });

      const zoneStore = useLinPulsarZoneStore();
      expect(zoneStore.zones.header).toEqual([
        { type: 'component', component: 'LocalComponent', props: undefined },
      ]);
      expect(zoneStore.zones.footer).toEqual([
        {
          type: 'federated',
          plugin: 'testModule/RemoteComponent',
          props: undefined,
        },
      ]);
    });

    it('should register the zones of the extra zone files after the module zones', async () => {
      const files = {
        '/modules/test.json': {
          ...config,
          zones: [{ zone: 'header', component: 'ModuleComponent' }],
        },
        '/zones/a.json': [
          { zone: 'header', plugin: 'testModule/RemoteComponent' },
        ],
        '/zones/b.json': [
          { zone: 'footer', component: 'ExtraComponent', props: { a: 1 } },
        ],
      };
      vi.stubGlobal(
        'fetch',
        vi.fn(async (url) => ({ ok: true, url, json: async () => files[url] }))
      );

      await linPulsarModuleFederation.init({
        router,
        remotes,
        modules,
        extraZones: ['/zones/a.json', '/zones/b.json'],
      });

      const zoneStore = useLinPulsarZoneStore();
      expect(zoneStore.zones.header).toEqual([
        { type: 'component', component: 'ModuleComponent', props: undefined },
        {
          type: 'federated',
          plugin: 'testModule/RemoteComponent',
          props: undefined,
        },
      ]);
      expect(zoneStore.zones.footer).toEqual([
        { type: 'component', component: 'ExtraComponent', props: { a: 1 } },
      ]);
    });

    it('should skip an extra zone file that fails to load or holds invalid zone definitions', async () => {
      const files = {
        '/zones/missing.json': { ok: false },
        '/zones/object.json': { zone: 'x' },
        '/zones/invalid-entry.json': ['bad'],
        '/zones/no-zone.json': [{ component: 'ExtraComponent' }],
        '/zones/no-target.json': [{ zone: 'footer' }],
        '/zones/both-targets.json': [
          { zone: 'footer', plugin: 'testModule/X', component: 'Y' },
        ],
        '/zones/wrong-target-type.json': [
          { zone: 'footer', plugin: 'testModule/X', component: 1 },
        ],
        '/zones/valid.json': [{ zone: 'footer', component: 'ExtraComponent' }],
      };
      vi.stubGlobal(
        'fetch',
        vi.fn(async (url) =>
          url === '/zones/missing.json'
            ? { ok: false }
            : { ok: true, url, json: async () => files[url] }
        )
      );

      await linPulsarModuleFederation.init({
        router,
        remotes,
        modules: [],
        extraZones: Object.keys(files),
      });

      const zoneStore = useLinPulsarZoneStore();
      expect(zoneStore.zones).toEqual({
        footer: [
          { type: 'component', component: 'ExtraComponent', props: undefined },
        ],
      });
    });

    it('should run the provided hook after the default phase runner', async () => {
      stubFetch(config);
      const configureHook = vi.fn(async () => ({ success: true }));

      await linPulsarModuleFederation.init({
        router,
        remotes,
        modules,
        hooks: { configure: configureHook },
      });

      expect(configureHook).toHaveBeenCalledWith(remoteModule, config, router);
      // The default configure runner still ran, before the hook.
      expect(remoteModule.configure).toHaveBeenCalledWith(config);
      expect(loadRemote).toHaveBeenCalledWith('testModule/routes');
      expect(remoteModule.configure.mock.invocationCallOrder[0]).toBeLessThan(
        configureHook.mock.invocationCallOrder[0]
      );
      // Phases without a hook keep their default behavior.
      expect(
        linPulsarModuleConfigurationService.registerModuleHostConfiguration
      ).toHaveBeenCalledWith(config);
      expect(remoteModule.postInit).toHaveBeenCalledWith(config);
    });
  });
});
