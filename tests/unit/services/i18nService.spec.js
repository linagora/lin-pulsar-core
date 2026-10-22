import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Test service: i18nService', () => {
  // We need to reset the module between tests to clear the singleton
  let getI18nInstance, setI18nInstance;

  beforeEach(async () => {
    vi.resetModules();
    const module = await import('src/services/i18nService');
    getI18nInstance = module.getI18nInstance;
    setI18nInstance = module.setI18nInstance;
  });

  describe('Test function: setI18nInstance', () => {
    it('should set the I18n successfully', () => {
      const mockI18n = {
        t: vi.fn((v) => v),
      };

      setI18nInstance(mockI18n);

      expect(getI18nInstance()).toBe(mockI18n);
    });

    it('should warn and ignore re-initialization', () => {
      const consoleWarnSpy = vi
        .spyOn(globalThis.console, 'warn')
        .mockImplementation(() => {});
      const firstI18n = {
        t: vi.fn((v) => v),
      };
      const secondI18n = {
        t: vi.fn((v) => `2${v}`),
      };

      setI18nInstance(firstI18n);
      setI18nInstance(secondI18n);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[LinPulsar Core] I18n has already been initialized. Re-initialization is ignored.'
      );
      expect(getI18nInstance().t('a')).toEqual('a');

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Test function: getI18nInstance', () => {
    it('should throw an error if client is not initialized', () => {
      expect(() => getI18nInstance()).toThrow(
        '[LinPulsar Core] I18n is not initialized. Call setI18nInstance() first.'
      );
    });
  });
});
