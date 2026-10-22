import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import LinPulsarZoneRenderer from 'src/components/LinPulsarZoneRenderer.vue';
import * as federationService from 'src/services/federationService';
import * as localComponentService from 'src/services/localComponentService';
import * as piniaStoreService from 'src/services/piniaStoreService.ts';
import { useLinPulsarZoneStore } from 'src/stores/linPulsarZoneStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/federationService', () => ({
  loadAsyncComponent: vi.fn(),
}));

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

vi.mock('src/services/localComponentService', () => ({
  resolveLocalComponent: vi.fn(),
}));

describe('Test component: LinPulsarZoneRenderer', () => {
  let pinia;
  let store;
  let wrapper;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);
    store = useLinPulsarZoneStore();
    vi.clearAllMocks();
  });

  describe('Test constant: components', () => {
    it('should not call loadAsyncComponent when the zone is not registered in store', async () => {
      wrapper = shallowMount(LinPulsarZoneRenderer, {
        props: { zone: 'unregistered-zone' },
        global: { plugins: [pinia] },
      });

      expect(federationService.loadAsyncComponent).not.toHaveBeenCalled();
      expect(wrapper.vm.components).toEqual([]);
    });

    it('should load components from store when zone is registered and has federated entries', async () => {
      const MockComponentA = {
        name: 'MockComponent',
        template: '<div>Mock</div>',
      };
      const MockComponentB = {
        name: 'MockComponent',
        template: '<div>Mock</div>',
      };
      vi.mocked(federationService.loadAsyncComponent)
        .mockReturnValueOnce(MockComponentA)
        .mockReturnValueOnce(MockComponentB);

      store.registerPlugin('test-zone', 'test-plugin/MockComponentA', {
        title: 'Test',
      });

      store.registerPlugin('test-zone', 'test-plugin/MockComponentB', {});

      wrapper = shallowMount(LinPulsarZoneRenderer, {
        props: { zone: 'test-zone' },
        global: { plugins: [pinia] },
      });

      expect(federationService.loadAsyncComponent).toHaveBeenCalledTimes(2);
      expect(federationService.loadAsyncComponent).toHaveBeenCalledWith(
        'test-plugin/MockComponentA'
      );
      expect(federationService.loadAsyncComponent).toHaveBeenCalledWith(
        'test-plugin/MockComponentB'
      );

      expect(wrapper.vm.components).toHaveLength(2);

      expect(wrapper.vm.components[0].props).toEqual({ title: 'Test' });
      expect(JSON.stringify(wrapper.vm.components[0].component)).toEqual(
        JSON.stringify(MockComponentA)
      );

      expect(wrapper.vm.components[1].props).toEqual({});
      expect(JSON.stringify(wrapper.vm.components[1].component)).toEqual(
        JSON.stringify(MockComponentB)
      );
    });

    it('should resolve a component entry by name without calling loadAsyncComponent', async () => {
      const DirectComponent = {
        name: 'DirectComponent',
        template: '<div>Direct</div>',
      };
      vi.mocked(localComponentService.resolveLocalComponent).mockReturnValue(
        DirectComponent
      );

      store.registerComponent('test-zone', 'DirectComponent', {
        title: 'Direct',
      });

      wrapper = shallowMount(LinPulsarZoneRenderer, {
        props: { zone: 'test-zone' },
        global: { plugins: [pinia] },
      });

      expect(federationService.loadAsyncComponent).not.toHaveBeenCalled();
      expect(localComponentService.resolveLocalComponent).toHaveBeenCalledWith(
        'DirectComponent'
      );

      expect(wrapper.vm.components).toHaveLength(1);
      expect(wrapper.vm.components[0].props).toEqual({ title: 'Direct' });
      expect(wrapper.vm.components[0].component).toBe(DirectComponent);
      expect(wrapper.findComponent(DirectComponent).exists()).toBe(true);
    });

    it('should keep the name as component when it is not registered', async () => {
      vi.mocked(localComponentService.resolveLocalComponent).mockReturnValue(
        'UnknownComponent'
      );

      store.registerComponent('test-zone', 'UnknownComponent');

      wrapper = shallowMount(LinPulsarZoneRenderer, {
        props: { zone: 'test-zone' },
        global: { plugins: [pinia] },
      });

      expect(wrapper.vm.components).toHaveLength(1);
      expect(wrapper.vm.components[0].component).toBe('UnknownComponent');
    });

    it('should render federated and component entries together', async () => {
      const MockPluginComponent = {
        name: 'MockPluginComponent',
        template: '<div>Plugin</div>',
      };
      const DirectComponent = {
        name: 'DirectComponent',
        template: '<div>Direct</div>',
      };
      vi.mocked(federationService.loadAsyncComponent).mockReturnValueOnce(
        MockPluginComponent
      );
      vi.mocked(localComponentService.resolveLocalComponent).mockReturnValue(
        DirectComponent
      );

      store.registerPlugin('test-zone', 'test-plugin/MockPluginComponent');
      store.registerComponent('test-zone', 'DirectComponent');

      wrapper = shallowMount(LinPulsarZoneRenderer, {
        props: { zone: 'test-zone' },
        global: { plugins: [pinia] },
      });

      expect(federationService.loadAsyncComponent).toHaveBeenCalledTimes(1);
      expect(federationService.loadAsyncComponent).toHaveBeenCalledWith(
        'test-plugin/MockPluginComponent'
      );

      expect(wrapper.vm.components).toHaveLength(2);
      expect(wrapper.vm.components[1].component).toBe(DirectComponent);
      expect(wrapper.findComponent(DirectComponent).exists()).toBe(true);
    });
  });
});
