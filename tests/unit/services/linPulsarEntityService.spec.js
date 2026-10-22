import * as httpClientService from 'src/services/httpClientService.ts';
import {
  deleteEntityById,
  getEntities,
  getEntityById,
  saveEntity,
  updateEntity,
  validate,
} from 'src/services/linPulsarEntityService.ts';
import { registerModuleHostConfiguration } from 'src/services/linPulsarModuleConfigurationService.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/httpClientService', () => ({
  getHttpClient: vi.fn(),
}));

describe('Test service: linPulsarEntityService', () => {
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(() => Promise.resolve({ data: 'test' })),
      post: vi.fn(() => Promise.resolve({ data: 'test' })),
      put: vi.fn(() => Promise.resolve({ data: 'test' })),
      delete: vi.fn(() => Promise.resolve()),
    };
    vi.mocked(httpClientService.getHttpClient).mockReturnValue(mockHttpClient);

    registerModuleHostConfiguration({
      apiEndpoint: 'test-endpoint',
      instanceId: 'id',
      entity: 'test',
      remoteName: 'remoteTest',
    });

    vi.clearAllMocks();
  });

  describe('Test function: saveEntity', () => {
    it('should call valid endpoint and retrieve expected data', async () => {
      const result = await saveEntity('id', { name: 'test' });

      expect(result).toEqual('test');
      expect(mockHttpClient.post).toHaveBeenCalledWith('/test-endpoint', {
        name: 'test',
      });
    });
  });

  describe('Test function: updateEntity', () => {
    it('should call valid endpoint and retrieve expected data', async () => {
      const result = await updateEntity('id', '1', { id: '1', name: 'test' });

      expect(result).toEqual('test');
      expect(mockHttpClient.put).toHaveBeenCalledWith('/test-endpoint/1', {
        id: '1',
        name: 'test',
      });
    });
  });

  describe('Test function: getEntities', () => {
    it('should call valid endpoint and retrieve expected data', async () => {
      const result = await getEntities('id', {}, {});

      expect(result).toEqual('test');
      expect(mockHttpClient.get).toHaveBeenCalledWith('/test-endpoint', {
        params: {},
      });
    });
  });

  describe('Test function: getEntityById', () => {
    it('should call valid endpoint and retrieve expected data', async () => {
      const result = await getEntityById('id', '1');

      expect(result).toEqual('test');
      expect(mockHttpClient.get).toHaveBeenCalledWith('/test-endpoint/1');
    });
  });

  describe('Test function: deleteEntityById', () => {
    it('should call valid endpoint and retrieve expected data', async () => {
      const result = await deleteEntityById('id', '1');

      expect(result).toBeUndefined();
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/test-endpoint/1');
    });
  });

  describe('Test function: validate', () => {
    it('should call valid endpoint and retrieve expected data', async () => {
      vi.mocked(httpClientService.getHttpClient().post).mockResolvedValue();

      const result = await validate('id', 'name', 'value');

      expect(result).toBeUndefined();
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/test-endpoint/validate/name',
        'value',
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });
});
