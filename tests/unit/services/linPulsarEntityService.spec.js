import nunjucks from 'nunjucks';
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
import { reactive } from 'vue';

vi.mock('src/services/httpClientService', () => ({
  getHttpClient: vi.fn(),
}));

const mockGetNunjucksEnv = vi.hoisted(() => vi.fn());

vi.mock('src/services/nunjucksService', async (importOriginal) => ({
  ...(await importOriginal()),
  getNunjucksEnv: mockGetNunjucksEnv,
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
    mockGetNunjucksEnv.mockReturnValue(
      new nunjucks.Environment(null, { autoescape: false })
    );
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

    it('should encode the entity identifier as a URI component', async () => {
      await updateEntity('id', 'a/b?c#d', { name: 'test' });

      expect(mockHttpClient.put).toHaveBeenCalledWith(
        '/test-endpoint/a%2Fb%3Fc%23d',
        { name: 'test' }
      );
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

    it('should encode the entity identifier as a URI component', async () => {
      await getEntityById('id', 'a/b?c#d');

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/test-endpoint/a%2Fb%3Fc%23d'
      );
    });
  });

  describe('Test function: deleteEntityById', () => {
    it('should call valid endpoint and retrieve expected data', async () => {
      const result = await deleteEntityById('id', '1');

      expect(result).toBeUndefined();
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/test-endpoint/1');
    });

    it('should encode the entity identifier as a URI component', async () => {
      await deleteEntityById('id', 'a/b?c#d');

      expect(mockHttpClient.delete).toHaveBeenCalledWith(
        '/test-endpoint/a%2Fb%3Fc%23d'
      );
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

  describe('Test templated apiEndpoint', () => {
    const context = { params: { parentId: '7' } };

    beforeEach(() => {
      registerModuleHostConfiguration({
        apiEndpoint: 'parents/{{ params.parentId }}/children',
        instanceId: 'templated',
        entity: 'children',
        remoteName: 'remoteTest',
      });
    });

    it('should render the endpoint with the context on saveEntity', async () => {
      await saveEntity('templated', { name: 'test' }, context);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/parents/7/children', {
        name: 'test',
      });
    });

    it('should render the endpoint with the context on updateEntity', async () => {
      await updateEntity('templated', '1', { name: 'test' }, context);

      expect(mockHttpClient.put).toHaveBeenCalledWith('/parents/7/children/1', {
        name: 'test',
      });
    });

    it('should render the endpoint with the context on getEntities', async () => {
      await getEntities('templated', {}, {}, context);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/parents/7/children', {
        params: {},
      });
    });

    it('should render the endpoint with the context on getEntityById', async () => {
      await getEntityById('templated', '1', context);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/parents/7/children/1');
    });

    it('should render the endpoint with the context on deleteEntityById', async () => {
      await deleteEntityById('templated', '1', context);

      expect(mockHttpClient.delete).toHaveBeenCalledWith(
        '/parents/7/children/1'
      );
    });

    it('should render the endpoint with the context on validate', async () => {
      await validate('templated', 'name', 'value', context);

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/parents/7/children/validate/name',
        'value',
        { headers: { 'Content-Type': 'application/json' } }
      );
    });

    it('should encode the values of the context as URI components', async () => {
      await getEntityById('templated', '1', {
        params: { parentId: 'a&b/c d' },
      });

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/parents/a%26b%2Fc%20d/children/1'
      );
    });

    it('should encode the values of an array', async () => {
      await getEntityById('templated', '1', {
        params: { parentId: ['a', 'b/c'] },
      });

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/parents/a,b%2Fc/children/1'
      );
    });

    it('should render the reactive route of a page', async () => {
      const route = reactive({
        params: { parentId: 'a b' },
        query: { tab: 'x' },
      });

      await getEntityById('templated', '1', {
        params: route.params,
        query: route.query,
      });

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/parents/a%20b/children/1'
      );
    });

    it('should remove the whitespace around the rendered endpoint', async () => {
      registerModuleHostConfiguration({
        apiEndpoint: '  parents/{{ params.parentId }}/children\n',
        instanceId: 'templated',
        entity: 'children',
        remoteName: 'remoteTest',
      });

      await getEntityById('templated', '1', context);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/parents/7/children/1');
    });
  });
});
