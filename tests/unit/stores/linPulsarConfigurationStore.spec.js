import { createPinia, setActivePinia } from 'pinia';
import * as linPulsarConfigurationService from 'src/services/linPulsarConfigurationService.ts';
import * as piniaStoreService from 'src/services/piniaStoreService.ts';
import { useLinPulsarConfigurationStore } from 'src/stores/linPulsarConfigurationStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/linPulsarConfigurationService', () => ({
  getEntitiesConfiguration: vi.fn(),
  getApiEndpointsConfiguration: vi.fn(),
}));

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

describe('Test store: linPulsarConfigurationStore', () => {
  let store;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);
    store = useLinPulsarConfigurationStore();
    vi.clearAllMocks();
  });

  describe('Test initial state', () => {
    it('should have empty initial state', () => {
      expect(store.entities).toEqual([]);
      expect(store.apiEndpoints).toEqual([]);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });
  });

  describe('Test getter: getEntityByName', () => {
    it('should return undefined when entity is not found', () => {
      store.entities = [{ name: 'user', attributes: [] }];

      const result = store.getEntityByName('unknown');

      expect(result).toBeUndefined();
    });

    it('should return the entity when found', () => {
      const userEntity = { name: 'user', attributes: [{ name: 'email' }] };
      store.entities = [userEntity, { name: 'group', attributes: [] }];

      const result = store.getEntityByName('user');

      expect(result).toEqual(userEntity);
    });
  });

  describe('Test getter: getApiEndpointsByEntity', () => {
    it('should return empty array when no apiEndpoints match', () => {
      store.apiEndpoints = [
        { method: 'GET', path: '/groups', entity: 'group', variables: [] },
      ];

      const result = store.getApiEndpointsByEntity('user');

      expect(result).toEqual([]);
    });

    it('should return all apiEndpoints for the specified entity', () => {
      const userApiEndpoints = [
        { method: 'GET', path: '/users', entity: 'user', variables: [] },
        { method: 'POST', path: '/users', entity: 'user', variables: [] },
      ];
      store.apiEndpoints = [
        ...userApiEndpoints,
        { method: 'GET', path: '/groups', entity: 'group', variables: [] },
      ];

      const result = store.getApiEndpointsByEntity('user');

      expect(result).toEqual(userApiEndpoints);
    });
  });

  describe('Test action: fetchConfiguration', () => {
    it('should fetch entities and apiEndpoints successfully', async () => {
      const mockEntities = [{ name: 'user', attributes: [] }];
      const mockApiEndpoints = [
        { method: 'GET', path: '/users', entity: 'user', variables: [] },
      ];

      vi.mocked(
        linPulsarConfigurationService.getEntitiesConfiguration
      ).mockResolvedValue(mockEntities);
      vi.mocked(
        linPulsarConfigurationService.getApiEndpointsConfiguration
      ).mockResolvedValue(mockApiEndpoints);

      await store.fetchConfiguration();

      expect(store.entities).toEqual(mockEntities);
      expect(store.apiEndpoints).toEqual(mockApiEndpoints);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('should set loading to true during fetch', async () => {
      let loadingDuringFetch = false;

      vi.mocked(
        linPulsarConfigurationService.getEntitiesConfiguration
      ).mockImplementation(async () => {
        loadingDuringFetch = store.loading;
        return [];
      });
      vi.mocked(
        linPulsarConfigurationService.getApiEndpointsConfiguration
      ).mockResolvedValue([]);

      await store.fetchConfiguration();

      expect(loadingDuringFetch).toBe(true);
      expect(store.loading).toBe(false);
    });

    it('should handle errors and set error message', async () => {
      const consoleErrorSpy = vi
        .spyOn(globalThis.console, 'error')
        .mockImplementation(() => {});
      const error = new Error('Network failure');

      vi.mocked(
        linPulsarConfigurationService.getEntitiesConfiguration
      ).mockRejectedValue(error);

      await store.fetchConfiguration();

      expect(store.error).toBe('Network failure');
      expect(store.loading).toBe(false);
      expect(store.entities).toEqual([]);
      expect(store.apiEndpoints).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[LinPulsar Core] Failed to fetch configuration:',
        error
      );

      consoleErrorSpy.mockRestore();
    });

    it('should handle non-Error exceptions', async () => {
      const consoleErrorSpy = vi
        .spyOn(globalThis.console, 'error')
        .mockImplementation(() => {});

      vi.mocked(
        linPulsarConfigurationService.getEntitiesConfiguration
      ).mockRejectedValue('String error');

      await store.fetchConfiguration();

      expect(store.error).toBe('Failed to fetch configuration');

      consoleErrorSpy.mockRestore();
    });

    it('should reset error on new fetch', async () => {
      store.error = 'Previous error';

      vi.mocked(
        linPulsarConfigurationService.getEntitiesConfiguration
      ).mockResolvedValue([]);
      vi.mocked(
        linPulsarConfigurationService.getApiEndpointsConfiguration
      ).mockResolvedValue([]);

      await store.fetchConfiguration();

      expect(store.error).toBeNull();
    });
  });
});
