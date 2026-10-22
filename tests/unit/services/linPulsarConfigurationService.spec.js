import * as httpClientService from 'src/services/httpClientService';
import {
  getApiEndpointsConfiguration,
  getEntitiesConfiguration,
  getEntityConfiguration,
} from 'src/services/linPulsarConfigurationService.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/httpClientService', () => ({
  getHttpClient: vi.fn(),
}));

describe('Test service: linPulsarConfigurationService', () => {
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
    };
    vi.mocked(httpClientService.getHttpClient).mockReturnValue(mockHttpClient);
    vi.clearAllMocks();
  });

  describe('Test function: getEntitiesConfiguration', () => {
    it('should fetch all entities from /metadata/entities', async () => {
      const mockEntities = [
        { name: 'user', attributes: [] },
        { name: 'group', attributes: [] },
      ];
      mockHttpClient.get.mockResolvedValue({ data: mockEntities });

      const result = await getEntitiesConfiguration();

      expect(httpClientService.getHttpClient).toHaveBeenCalled();
      expect(mockHttpClient.get).toHaveBeenCalledWith('/metadata/entities');
      expect(result).toEqual(mockEntities);
    });

    it('should propagate errors from HTTP client', async () => {
      const error = new Error('Network error');
      mockHttpClient.get.mockRejectedValue(error);

      await expect(getEntitiesConfiguration()).rejects.toThrow('Network error');
    });
  });

  describe('Test function: getEntityConfiguration', () => {
    it('should fetch a specific entity from /metadata/entities/:entity', async () => {
      const mockEntity = {
        name: 'user',
        attributes: [
          {
            name: 'email',
            type: 'string',
            required: true,
            hasValidations: false,
            input: 'text',
            inputSettings: {},
          },
        ],
      };
      mockHttpClient.get.mockResolvedValue({ data: mockEntity });

      const result = await getEntityConfiguration('user');

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/metadata/entities/user'
      );
      expect(result).toEqual(mockEntity);
    });

    it('should handle special characters in entity ID', async () => {
      const mockEntity = { name: 'my-entity', attributes: [] };
      mockHttpClient.get.mockResolvedValue({ data: mockEntity });

      const result = await getEntityConfiguration('my-entity');

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/metadata/entities/my-entity'
      );
      expect(result).toEqual(mockEntity);
    });

    it('should propagate errors from HTTP client', async () => {
      mockHttpClient.get.mockRejectedValue(new Error('Not found'));

      await expect(getEntityConfiguration('unknown')).rejects.toThrow(
        'Not found'
      );
    });
  });

  describe('Test function: getApiEndpointsConfiguration', () => {
    it('should fetch all api endpoints from /metadata/routes', async () => {
      const mockApiEndpoints = [
        { method: 'GET', path: '/users', entity: 'user', variables: [] },
        { method: 'POST', path: '/users', entity: 'user', variables: [] },
      ];
      mockHttpClient.get.mockResolvedValue({ data: mockApiEndpoints });

      const result = await getApiEndpointsConfiguration();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/metadata/routes');
      expect(result).toEqual(mockApiEndpoints);
    });

    it('should propagate errors from HTTP client', async () => {
      mockHttpClient.get.mockRejectedValue(new Error('Server error'));

      await expect(getApiEndpointsConfiguration()).rejects.toThrow(
        'Server error'
      );
    });
  });
});
