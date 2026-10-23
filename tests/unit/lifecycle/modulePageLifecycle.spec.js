import { createPinia, setActivePinia } from 'pinia';
import { createModulePageLifecycle } from 'src/lifecycle/modulePageLifecycle';
import { BasicRemoteModule } from 'src/lifecycle/skeleton';
import * as piniaStoreService from 'src/services/piniaStoreService';
import { useLinPulsarUiStore } from 'src/stores/linPulsarUiStore';
import { useLinPulsarZoneStore } from 'src/stores/linPulsarZoneStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

describe('Test function: createModulePageLifecycle', () => {
  const config = {
    instanceId: 'test-module',
    remoteName: 'testModule',
    entity: 'TestModuleEntity',
    apiEndpoint: '/api/test-module',
    basePath: '/test-module',
  };

  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);
  });

  describe('Test metadata', () => {
    it('should create a BasicRemoteModule with the provided metadata', () => {
      const module = createModulePageLifecycle({
        id: 'test-module',
        name: 'Test Module',
        version: '1.0.0',
        dialogZone: 'base-layout.dialogComponent',
        description: 'Test description',
      });

      expect(module).toBeInstanceOf(BasicRemoteModule);
      expect(module.id).toBe('test-module');
      expect(module.name).toBe('Test Module');
      expect(module.version).toBe('1.0.0');
      expect(module.description).toBe('Test description');
    });
  });

  describe('Test hook: postInit', () => {
    it('should register a navigation menu item when addNavigationMenu is enabled', async () => {
      const module = createModulePageLifecycle({
        id: 'test-module',
        name: 'Test Module',
        version: '1.0.0',
        dialogZone: 'base-layout.dialogComponent',
      });

      const result = await module.postInit({
        ...config,
        options: { addNavigationMenu: true },
      });

      expect(result).toEqual({ success: true });
      expect(useLinPulsarUiStore().mainNavigationItems).toEqual([
        {
          id: 'test-module',
          labelKey: 'test-module.NavigationMenu.label',
          path: '/test-module',
        },
      ]);
    });

    it('should not register a navigation menu item when addNavigationMenu is disabled', async () => {
      const module = createModulePageLifecycle({
        id: 'test-module',
        name: 'Test Module',
        version: '1.0.0',
        dialogZone: 'base-layout.dialogComponent',
      });

      const result = await module.postInit(config);

      expect(result).toEqual({ success: true });
      expect(useLinPulsarUiStore().mainNavigationItems).toEqual([]);
    });

    it('should register each dialog component once in the layout dialog zone', async () => {
      const module = createModulePageLifecycle({
        id: 'test-module',
        name: 'Test Module',
        version: '1.0.0',
        dialogZone: 'base-layout.dialogComponent',
        dialogComponents: [
          'testModule/ConfirmationDialog',
          'testModule/FormDialog',
        ],
      });

      await module.postInit(config);
      await module.postInit(config);

      const entries =
        useLinPulsarZoneStore().zones['base-layout.dialogComponent'];
      expect(entries.map((entry) => entry.plugin)).toEqual([
        'testModule/ConfirmationDialog',
        'testModule/FormDialog',
      ]);
    });

    it('should register the dialog components in the provided dialog zone', async () => {
      const module = createModulePageLifecycle({
        id: 'test-module',
        name: 'Test Module',
        version: '1.0.0',
        dialogZone: 'custom-layout.dialogComponent',
        dialogComponents: ['testModule/ConfirmationDialog'],
      });

      await module.postInit(config);

      const entries =
        useLinPulsarZoneStore().zones['custom-layout.dialogComponent'];
      expect(entries.map((entry) => entry.plugin)).toEqual([
        'testModule/ConfirmationDialog',
      ]);
      expect(
        useLinPulsarZoneStore().zones['base-layout.dialogComponent']
      ).toBeUndefined();
    });
  });

  describe('Test lifecycle overrides', () => {
    it('should return success by default on non-overridden phases', async () => {
      const module = createModulePageLifecycle({
        id: 'test-module',
        name: 'Test Module',
        version: '1.0.0',
        dialogZone: 'base-layout.dialogComponent',
      });

      expect(await module.setup()).toEqual({ success: true });
      expect(await module.configure(config)).toEqual({ success: true });
      expect(await module.initialize(config)).toEqual({ success: true });
      expect(await module.ready(config)).toEqual({ success: true });
    });

    it('should replace a phase with the provided hook', async () => {
      const ready = vi.fn(async () => ({ success: false, error: 'not ready' }));
      const module = createModulePageLifecycle({
        id: 'test-module',
        name: 'Test Module',
        version: '1.0.0',
        dialogZone: 'base-layout.dialogComponent',
        hooks: { ready },
      });

      const result = await module.ready(config);

      expect(ready).toHaveBeenCalledWith(config);
      expect(result).toEqual({ success: false, error: 'not ready' });
    });

    it('should replace the default postInit with the provided hook', async () => {
      const postInit = vi.fn(async () => ({ success: true }));
      const module = createModulePageLifecycle({
        id: 'test-module',
        name: 'Test Module',
        version: '1.0.0',
        dialogZone: 'base-layout.dialogComponent',
        hooks: { postInit },
      });

      await module.postInit({
        ...config,
        options: { addNavigationMenu: true },
      });

      expect(postInit).toHaveBeenCalledTimes(1);
      expect(useLinPulsarUiStore().mainNavigationItems).toEqual([]);
    });
  });
});
