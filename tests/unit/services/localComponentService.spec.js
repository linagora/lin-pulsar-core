import {
  getLocalComponent,
  registerLocalComponent,
  registerLocalComponents,
  resolveLocalComponent,
} from 'src/services/localComponentService';
import { afterEach, describe, expect, it, vi } from 'vitest';

const DirectComponent = {
  name: 'DirectComponent',
  template: '<div>Direct</div>',
};

const OtherComponent = {
  name: 'OtherComponent',
  template: '<div>Other</div>',
};

describe('Test service: localComponentService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Test function: registerLocalComponent', () => {
    it('should make the component resolvable by its name', () => {
      registerLocalComponent('SingleComponent', DirectComponent);

      expect(resolveLocalComponent('SingleComponent')).toBe(DirectComponent);
    });

    it('should override the component already registered under the same name', () => {
      registerLocalComponent('OverriddenComponent', DirectComponent);
      registerLocalComponent('OverriddenComponent', OtherComponent);

      expect(resolveLocalComponent('OverriddenComponent')).toBe(OtherComponent);
    });
  });

  describe('Test function: registerLocalComponents', () => {
    it('should make every given component resolvable by its name', () => {
      registerLocalComponents({
        FirstComponent: DirectComponent,
        SecondComponent: OtherComponent,
      });

      expect(resolveLocalComponent('FirstComponent')).toBe(DirectComponent);
      expect(resolveLocalComponent('SecondComponent')).toBe(OtherComponent);
    });

    it('should register nothing when given no component', () => {
      expect(() => registerLocalComponents({})).not.toThrow();
    });
  });

  describe('Test function: getLocalComponent', () => {
    it('should return the value registered under a known name', () => {
      const localRoutes = [{ path: '/local', component: 'LocalPage' }];
      registerLocalComponent('RegisteredRoutes', localRoutes);

      expect(getLocalComponent('RegisteredRoutes')).toBe(localRoutes);
    });

    it('should return undefined for an unknown name, without warning', () => {
      const warn = vi
        .spyOn(globalThis.console, 'warn')
        .mockImplementation(() => {});

      expect(getLocalComponent('NeverRegistered')).toBeUndefined();
      expect(warn).not.toHaveBeenCalled();
    });
  });

  describe('Test function: resolveLocalComponent', () => {
    it('should return the registered component for a known name', () => {
      registerLocalComponent('KnownComponent', DirectComponent);

      expect(resolveLocalComponent('KnownComponent')).toBe(DirectComponent);
    });

    it('should fall back to the name itself for an unknown name', () => {
      vi.spyOn(globalThis.console, 'warn').mockImplementation(() => {});

      expect(resolveLocalComponent('UnknownComponent')).toBe('UnknownComponent');
    });

    it('should warn when the name is unknown', () => {
      const warn = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => {});

      resolveLocalComponent('MissingComponent');

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('MissingComponent');
    });

    it('should not warn when the name is known', () => {
      const warn = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => {});
      registerLocalComponent('SilentComponent', DirectComponent);

      resolveLocalComponent('SilentComponent');

      expect(warn).not.toHaveBeenCalled();
    });
  });
});
