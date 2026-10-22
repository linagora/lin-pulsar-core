import { beforeEach, describe, expect, it, vi } from 'vitest';

let getDayjsInstance, setDayjsInstance;

describe('Test service: dayjsService', () => {
  beforeEach(async () => {
    vi.resetModules();
    const module = await import('src/services/dayjsService');
    getDayjsInstance = module.getDayjsInstance;
    setDayjsInstance = module.setDayjsInstance;
  });

  describe('Test function: setDayjsInstance', () => {
    it('should set the Dayjs instance successfully', () => {
      const mockInstance = vi.fn();

      setDayjsInstance(mockInstance);

      expect(getDayjsInstance()).toBe(mockInstance);
    });

    it('should warn and ignore re-initialization', () => {
      const consoleWarnSpy = vi
        .spyOn(globalThis.console, 'warn')
        .mockImplementation(() => {});
      const firstInstance = vi.fn();
      const secondInstance = vi.fn();

      setDayjsInstance(firstInstance);
      setDayjsInstance(secondInstance);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[LinPulsar Core] Dayjs instance has already been initialized. Re-initialization is ignored.'
      );
      expect(getDayjsInstance()).toBe(firstInstance);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Test function: getDayjsInstance', () => {
    it('should throw an error if instance is not initialized', () => {
      expect(() => getDayjsInstance()).toThrow(
        '[LinPulsar Core] Dayjs instance is not initialized. Call setDayjsInstance() first.'
      );
    });
  });
});
