import { beforeEach, describe, expect, it, vi } from 'vitest';

// We need to reset the module between tests to clear the singleton
let getPiniaStore, setPiniaStore;

describe('Test service: piniaStoreService', () => {
  beforeEach(async () => {
    vi.resetModules();
    const module = await import('src/services/piniaStoreService');
    getPiniaStore = module.getPiniaStore;
    setPiniaStore = module.setPiniaStore;
  });

  describe('Test function: setPiniaStore', () => {
    it('should set the Pinia store successfully', () => {
      const mockStore = { get: vi.fn(), post: vi.fn() };

      setPiniaStore(mockStore);
      expect(getPiniaStore()).toBe(mockStore);
    });

    it('should warn and ignore re-initialization', () => {
      const consoleWarnSpy = vi
        .spyOn(globalThis.console, 'warn')
        .mockImplementation(() => {});
      const firstStore = { get: vi.fn() };
      const secondStore = { post: vi.fn() };

      setPiniaStore(firstStore);
      setPiniaStore(secondStore);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[LinPulsar Core] Pinia store has already been initialized. Re-initialization is ignored.'
      );
      expect(getPiniaStore()).toBe(firstStore);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Test function: getPiniaStore', () => {
    it('should throw an error if store is not initialized', () => {
      expect(() => getPiniaStore()).toThrow(
        '[LinPulsar Core] Pinia store is not initialized. Call setPiniaStore() first.'
      );
    });
  });
});
