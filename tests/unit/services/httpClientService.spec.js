import { beforeEach, describe, expect, it, vi } from 'vitest';

// We need to reset the module between tests to clear the singleton
let getHttpClient, setHttpClient;

describe('Test service: httpClientService', () => {
  beforeEach(async () => {
    vi.resetModules();
    const module = await import('src/services/httpClientService');
    getHttpClient = module.getHttpClient;
    setHttpClient = module.setHttpClient;
  });

  describe('Test function: setHttpClient', () => {
    it('should set the HTTP client successfully', () => {
      const mockClient = { get: vi.fn(), post: vi.fn() };

      setHttpClient(mockClient);

      expect(getHttpClient()).toBe(mockClient);
    });

    it('should warn and ignore re-initialization', () => {
      const consoleWarnSpy = vi
        .spyOn(globalThis.console, 'warn')
        .mockImplementation(() => {});
      const firstClient = { get: vi.fn() };
      const secondClient = { post: vi.fn() };

      setHttpClient(firstClient);
      setHttpClient(secondClient);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[LinPulsar Core] HTTP client has already been initialized. Re-initialization is ignored.'
      );
      expect(getHttpClient()).toBe(firstClient);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Test function: getHttpClient', () => {
    it('should throw an error if client is not initialized', () => {
      expect(() => getHttpClient()).toThrow(
        '[LinPulsar Core] HTTP client is not initialized. Call setHttpClient() first.'
      );
    });
  });
});
