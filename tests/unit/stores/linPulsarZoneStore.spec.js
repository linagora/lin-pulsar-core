import { createPinia, setActivePinia } from 'pinia';
import * as piniaStoreService from 'src/services/piniaStoreService.ts';
import { useLinPulsarZoneStore } from 'src/stores/linPulsarZoneStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

const DIRECT_COMPONENT = 'DirectComponent';

describe('Test store: linPulsarZoneStore', () => {
  let pinia;
  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);
  });

  describe('Test initial state', () => {
    it('should initialize with empty zones', () => {
      const store = useLinPulsarZoneStore();

      expect(store.zones).toEqual({});
    });
  });

  describe('Test function: registerPlugin', () => {
    it('should register a federated entry in a new zone', () => {
      const store = useLinPulsarZoneStore();

      store.registerPlugin('list-page.sidebar', 'test-plugin/TestComponent');

      expect(store.zones['list-page.sidebar']).toBeDefined();
      expect(store.zones['list-page.sidebar']).toHaveLength(1);
      expect(store.zones['list-page.sidebar'][0]).toEqual({
        type: 'federated',
        plugin: 'test-plugin/TestComponent',
        props: undefined,
      });
    });

    it('should register multiple entries in the same zone', () => {
      const store = useLinPulsarZoneStore();

      store.registerPlugin('list-page.sidebar', 'plugin-1/Component1');
      store.registerPlugin('list-page.sidebar', 'plugin-2/Component2', {
        value: 42,
      });

      expect(store.zones['list-page.sidebar']).toHaveLength(2);
      expect(store.zones['list-page.sidebar'][0].plugin).toBe(
        'plugin-1/Component1'
      );
      expect(store.zones['list-page.sidebar'][1].plugin).toBe(
        'plugin-2/Component2'
      );
      expect(store.zones['list-page.sidebar'][1].props).toEqual({ value: 42 });
    });

    it('should register entries in different zones independently', () => {
      const store = useLinPulsarZoneStore();

      store.registerPlugin('list-page.header', 'header-plugin/HeaderComponent');
      store.registerPlugin('list-page.footer', 'footer-plugin/FooterComponent');

      expect(store.zones['list-page.header']).toHaveLength(1);
      expect(store.zones['list-page.footer']).toHaveLength(1);
      expect(store.zones['list-page.header'][0].plugin).toBe(
        'header-plugin/HeaderComponent'
      );
      expect(store.zones['list-page.footer'][0].plugin).toBe(
        'footer-plugin/FooterComponent'
      );
    });

    it('should handle entries with complex props', () => {
      const store = useLinPulsarZoneStore();
      const props = {
        title: 'Test Title',
        count: 123,
        enabled: true,
        config: {
          nested: {
            value: 'deep',
          },
        },
        items: ['a', 'b', 'c'],
      };

      store.registerPlugin(
        'list-page.body',
        'complex-plugin/ComplexComponent',
        props
      );

      expect(store.zones['list-page.body'][0].props).toEqual(props);
    });
  });

  describe('Test function: registerPluginOnce', () => {
    it('should register an entry if plugin is not already present', () => {
      const store = useLinPulsarZoneStore();

      store.registerPluginOnce('list-page.sidebar', 'unique-plugin/Component');

      expect(store.zones['list-page.sidebar']).toHaveLength(1);
      expect(store.zones['list-page.sidebar'][0]).toEqual({
        type: 'federated',
        plugin: 'unique-plugin/Component',
        props: undefined,
      });
    });

    it('should not register the same plugin twice in the same zone', () => {
      const store = useLinPulsarZoneStore();

      store.registerPluginOnce('list-page.sidebar', 'unique-plugin/Component', {
        value: 1,
      });
      store.registerPluginOnce('list-page.sidebar', 'unique-plugin/Component', {
        value: 2,
      });

      expect(store.zones['list-page.sidebar']).toHaveLength(1);
      expect(store.zones['list-page.sidebar'][0].props).toEqual({ value: 1 });
    });

    it('should allow different plugins in the same zone', () => {
      const store = useLinPulsarZoneStore();

      store.registerPluginOnce('list-page.sidebar', 'plugin-1/Component');
      store.registerPluginOnce('list-page.sidebar', 'plugin-2/Component');

      expect(store.zones['list-page.sidebar']).toHaveLength(2);
    });

    it('should isolate plugin uniqueness per zone', () => {
      const store = useLinPulsarZoneStore();

      store.registerPluginOnce('zone-a', 'shared-plugin/Component');
      store.registerPluginOnce('zone-b', 'shared-plugin/Component');

      expect(store.zones['zone-a']).toHaveLength(1);
      expect(store.zones['zone-b']).toHaveLength(1);
    });

    it('should create zone automatically if it does not exist', () => {
      const store = useLinPulsarZoneStore();

      store.registerPluginOnce('new-zone', 'auto-zone-plugin/Component');

      expect(store.zones['new-zone']).toBeDefined();
      expect(store.zones['new-zone']).toHaveLength(1);
    });

    it('should ignore component entries when checking plugin uniqueness', () => {
      const store = useLinPulsarZoneStore();

      store.registerComponent('list-page.sidebar', DIRECT_COMPONENT);
      store.registerPluginOnce('list-page.sidebar', 'unique-plugin/Component');

      expect(store.zones['list-page.sidebar']).toHaveLength(2);
    });
  });

  describe('Test function: registerComponent', () => {
    it('should register a component entry in a new zone', () => {
      const store = useLinPulsarZoneStore();

      store.registerComponent('list-page.sidebar', DIRECT_COMPONENT, {
        title: 'Direct',
      });

      expect(store.zones['list-page.sidebar']).toBeDefined();
      expect(store.zones['list-page.sidebar']).toHaveLength(1);
      expect(store.zones['list-page.sidebar'][0].type).toBe('component');
      expect(store.zones['list-page.sidebar'][0].props).toEqual({
        title: 'Direct',
      });
    });

    it('should store the component name as provided', () => {
      const store = useLinPulsarZoneStore();

      store.registerComponent('list-page.sidebar', DIRECT_COMPONENT);

      expect(store.zones['list-page.sidebar'][0].component).toBe(
        DIRECT_COMPONENT
      );
    });

    it('should register multiple component entries in the same zone', () => {
      const store = useLinPulsarZoneStore();

      store.registerComponent('list-page.sidebar', DIRECT_COMPONENT);
      store.registerComponent('list-page.sidebar', 'OtherComponent');

      expect(store.zones['list-page.sidebar']).toHaveLength(2);
    });

    it('should register component and federated entries in the same zone', () => {
      const store = useLinPulsarZoneStore();

      store.registerPlugin('list-page.sidebar', 'test-plugin/Component');
      store.registerComponent('list-page.sidebar', DIRECT_COMPONENT);

      expect(store.zones['list-page.sidebar']).toHaveLength(2);
      expect(store.zones['list-page.sidebar'][0].type).toBe('federated');
      expect(store.zones['list-page.sidebar'][1].type).toBe('component');
    });
  });

  describe('Test getter: hasZoneEntries', () => {
    it('should return false for an unknown zone', () => {
      const store = useLinPulsarZoneStore();

      expect(store.hasZoneEntries('unknown-zone')).toBe(false);
    });

    it('should return true for a zone holding a federated entry', () => {
      const store = useLinPulsarZoneStore();

      store.registerPlugin('list-page.sidebar', 'test-plugin/TestComponent');

      expect(store.hasZoneEntries('list-page.sidebar')).toBe(true);
    });

    it('should return true for a zone holding a component entry', () => {
      const store = useLinPulsarZoneStore();

      store.registerComponent('list-page.sidebar', DIRECT_COMPONENT);

      expect(store.hasZoneEntries('list-page.sidebar')).toBe(true);
    });

    it('should return true for a zone holding multiple entries', () => {
      const store = useLinPulsarZoneStore();

      store.registerPlugin('list-page.sidebar', 'test-plugin/TestComponent');
      store.registerComponent('list-page.sidebar', DIRECT_COMPONENT);

      expect(store.hasZoneEntries('list-page.sidebar')).toBe(true);
    });

    it('should evaluate each zone independently', () => {
      const store = useLinPulsarZoneStore();

      store.registerPlugin('zone-a', 'test-plugin/TestComponent');

      expect(store.hasZoneEntries('zone-a')).toBe(true);
      expect(store.hasZoneEntries('zone-b')).toBe(false);
    });
  });
});
