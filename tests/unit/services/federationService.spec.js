import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineAsyncComponent } from 'vue';

vi.mock('@module-federation/enhanced/runtime');
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    defineAsyncComponent: vi.fn((loader) => loader),
  };
});

// We need to reset the module between tests to clear the singleton
let getModuleFederation, setModuleFederation, loadAsyncComponent;

describe('Test service: federationService', () => {
  beforeEach(async () => {
    vi.resetModules();
    const module = await import('src/services/federationService');
    getModuleFederation = module.getModuleFederation;
    setModuleFederation = module.setModuleFederation;
    loadAsyncComponent = module.loadAsyncComponent;
    vi.clearAllMocks();
  });

  describe('Test function: setModuleFederation', () => {
    it('should set the Module Federation successfully', () => {
      const instance = { loadRemote: vi.fn() };

      setModuleFederation(instance);

      expect(getModuleFederation()).toBe(instance);
    });

    it('should warn and ignore re-initialization', () => {
      const consoleWarnSpy = vi
        .spyOn(globalThis.console, 'warn')
        .mockImplementation(() => {});
      const firstClient = { loadRemote: vi.fn() };
      const secondClient = { createInstance: vi.fn() };

      setModuleFederation(firstClient);
      setModuleFederation(secondClient);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[LinPulsar Core] Module Federation has already been initialized. Re-initialization is ignored.'
      );
      expect(getModuleFederation()).toBe(firstClient);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Test function: getModuleFederation', () => {
    it('should throw an error if instance is not initialized', () => {
      expect(() => getModuleFederation()).toThrow(
        '[LinPulsar Core] Module Federation is not initialized. Call setModuleFederation() first.'
      );
    });
  });

  describe('Test function: loadAsyncComponent', () => {
    it('should load a remote component successfully', async () => {
      const testComponent = { default: 'RemoteTestComponent' };
      const loadRemote = vi.fn().mockResolvedValue(testComponent);

      setModuleFederation({
        loadRemote,
      });

      const loader = loadAsyncComponent('test-plugin/TestComponent');
      const result = await loader();

      expect(loadRemote).toHaveBeenCalledTimes(1);
      expect(loadRemote).toHaveBeenCalledWith('test-plugin/TestComponent');
      expect(defineAsyncComponent).toHaveBeenCalled();
      expect(result).toEqual('RemoteTestComponent');
    });

    it('should throw an error if remote component export a null default', async () => {
      const testComponent = { default: null };
      const loadRemote = vi.fn().mockResolvedValue(testComponent);

      setModuleFederation({
        loadRemote,
      });

      const loader = loadAsyncComponent('invalid-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from invalid-plugin'
      );
      expect(loadRemote).toHaveBeenCalledWith('invalid-plugin/TestComponent');
    });

    it('should throw an error if remote component export an undefined default', async () => {
      const testComponent = { default: undefined };
      const loadRemote = vi.fn().mockResolvedValue(testComponent);

      setModuleFederation({
        loadRemote,
      });

      const loader = loadAsyncComponent('invalid-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from invalid-plugin'
      );
      expect(loadRemote).toHaveBeenCalledWith('invalid-plugin/TestComponent');
    });

    it('should throw an error if remote component does not have a default export', async () => {
      const testComponent = { toto: vi.fn() };
      const loadRemote = vi.fn().mockResolvedValue(testComponent);

      setModuleFederation({
        loadRemote,
      });

      const loader = loadAsyncComponent('invalid-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from invalid-plugin'
      );
      expect(loadRemote).toHaveBeenCalledWith('invalid-plugin/TestComponent');
    });

    it('should throw an error if module is null', async () => {
      const loadRemote = vi.fn().mockResolvedValue(null);

      setModuleFederation({
        loadRemote,
      });

      const loader = loadAsyncComponent('null-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from null-plugin'
      );
    });

    it('should throw an error if module is undefined', async () => {
      const loadRemote = vi.fn().mockResolvedValue(undefined);

      setModuleFederation({
        loadRemote,
      });

      const loader = loadAsyncComponent('undefined-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from undefined-plugin'
      );
    });

    it('should throw an error if loadRemote rejects', async () => {
      const error = new Error('Network error');
      const loadRemote = vi.fn().mockRejectedValue(error);

      setModuleFederation({
        loadRemote,
      });

      const loader = loadAsyncComponent('failing-plugin/TestComponent');

      await expect(loader()).rejects.toThrow('Network error');
      expect(loadRemote).toHaveBeenCalledWith('failing-plugin/TestComponent');
    });

    it('should handle different plugin names', async () => {
      const plugins = ['plugin-a', 'plugin-b', 'plugin-c'];
      const testComponentA = { default: 'RemoteTestComponentA' };
      const testComponentB = { default: 'RemoteTestComponentB' };
      const testComponentC = { default: 'RemoteTestComponentC' };

      const loadRemote = vi
        .fn()
        .mockResolvedValueOnce(testComponentA)
        .mockResolvedValueOnce(testComponentB)
        .mockResolvedValueOnce(testComponentC);

      setModuleFederation({
        loadRemote,
      });

      for (const plugin of plugins) {
        const loader = loadAsyncComponent(`${plugin}/TestComponent`);
        const result = await loader();
        const lastChar = plugin.charAt(plugin.length - 1).toUpperCase();

        expect(loadRemote).toHaveBeenCalledWith(`${plugin}/TestComponent`);
        expect(result).toEqual(`RemoteTestComponent${lastChar}`);
      }

      expect(loadRemote).toHaveBeenCalledTimes(3);
    });
  });
});
