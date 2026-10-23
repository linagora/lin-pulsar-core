import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Test service: uiDesignService', () => {
  // We need to reset the module between tests to clear the singleton
  let getUiDesign, setUiDesign;

  beforeEach(async () => {
    vi.resetModules();
    const module = await import('src/services/uiDesignService');
    getUiDesign = module.getUiDesign;
    setUiDesign = module.setUiDesign;
  });

  describe('Test function: setUiDesign', () => {
    it('should set the UI Design successfully', () => {
      const mockUiDesign = {
        default: {
          button: {
            flat: true,
          },
        },
        custom: {
          button: {
            flat: false,
          },
        },
      };

      setUiDesign(mockUiDesign);

      expect(getUiDesign()).toBe(mockUiDesign);
    });

    it('should warn and ignore re-initialization', () => {
      const consoleWarnSpy = vi
        .spyOn(globalThis.console, 'warn')
        .mockImplementation(() => {});
      const firstUiDesign = { default: {} };
      const secondUiDesign = { default: {}, custom: {} };

      setUiDesign(firstUiDesign);
      setUiDesign(secondUiDesign);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[LinPulsar Core] UI Design has already been initialized. Re-initialization is ignored.'
      );
      expect(getUiDesign()).toBe(firstUiDesign);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Test function: getUiDesign', () => {
    it('should throw an error if client is not initialized', () => {
      expect(() => getUiDesign()).toThrow(
        '[LinPulsar Core] UI Design is not initialized. Call setUiDesign() first.'
      );
    });
  });
});
