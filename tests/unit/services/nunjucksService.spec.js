import { beforeEach, describe, expect, it, vi } from 'vitest';

let getNunjucksEnv, setNunjucksEnv;

describe('Test service: nunjucksService', () => {
  beforeEach(async () => {
    vi.resetModules();
    const module = await import('src/services/nunjucksService');
    getNunjucksEnv = module.getNunjucksEnv;
    setNunjucksEnv = module.setNunjucksEnv;
  });

  describe('Test function: setNunjucksEnv', () => {
    it('should set the Nunjucks environment successfully', () => {
      const mockEnv = { render: vi.fn(), addGlobal: vi.fn() };

      setNunjucksEnv(mockEnv);

      expect(getNunjucksEnv()).toBe(mockEnv);
    });

    it('should warn and ignore re-initialization', () => {
      const consoleWarnSpy = vi
        .spyOn(globalThis.console, 'warn')
        .mockImplementation(() => {});
      const firstEnv = { render: vi.fn(), addGlobal: vi.fn() };
      const secondEnv = { render: vi.fn(), addGlobal: vi.fn() };

      setNunjucksEnv(firstEnv);
      setNunjucksEnv(secondEnv);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[LinPulsar Core] Nunjucks environment has already been initialized. Re-initialization is ignored.'
      );
      expect(getNunjucksEnv()).toBe(firstEnv);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Test function: getNunjucksEnv', () => {
    it('should throw an error if environment is not initialized', () => {
      expect(() => getNunjucksEnv()).toThrow(
        '[LinPulsar Core] Nunjucks environment is not initialized. Call setNunjucksEnv() first.'
      );
    });
  });
});
