import {
  getModuleHostConfiguration,
  registerModuleHostConfiguration,
} from 'src/services/linPulsarModuleConfigurationService.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Test service: linPulsarModuleConfigurationService', () => {
  const mockConfig = {
    instanceId: 'test-module',
    name: 'Test Module',
    version: '1.0.0',
    url: '/test-module',
    basePath: '/app',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test function: registerModuleHostConfiguration', () => {
    it('should register a module host configuration', () => {
      registerModuleHostConfiguration(mockConfig);
      const storedConfig = getModuleHostConfiguration(mockConfig.instanceId);

      expect(storedConfig).toBeDefined();
      expect(storedConfig.instanceId).toBe(mockConfig.instanceId);
      expect(storedConfig.name).toBe(mockConfig.name);
    });

    it('should overwrite an existing configuration with the same instanceId', () => {
      const updatedConfig = {
        ...mockConfig,
        name: 'Updated Module',
        basePath: '/new-app',
      };
      registerModuleHostConfiguration(mockConfig);
      registerModuleHostConfiguration(updatedConfig);

      const storedConfig = getModuleHostConfiguration(mockConfig.instanceId);
      expect(storedConfig.name).toBe('Updated Module');
      expect(storedConfig.basePath).toBe('/new-app');
    });
  });

  describe('Test function: getModuleHostConfiguration', () => {
    it('should throw an error if no module host configuration is found for the given instanceId', () => {
      expect(() => getModuleHostConfiguration('non-existent-id')).toThrow(
        '[LinPulsar Core] No module host configuration found for instanceId: non-existent-id'
      );
    });
  });
});
