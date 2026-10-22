import { useLinPulsarFilterUrl } from 'src/composables/useLinPulsarFilterUrl';
import { LinPulsarFilter } from 'src/filters/linPulsarFilter';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Test composable: useLinPulsarFilterUrl', () => {
  let router;
  let route;

  const createFilter = (name, value) => ({
    name,
    toString: () => value,
  });

  beforeEach(() => {
    vi.clearAllMocks();

    router = {
      replace: vi.fn(),
    };

    route = {
      query: {},
    };

    vi.spyOn(LinPulsarFilter, 'fromString').mockImplementation((name, value) => ({
      name,
      value,
    }));
  });

  describe('setFiltersInUrl', () => {
    it('should replace the route query with the serialized filters', () => {
      route.query = { unrelated: 'kept-by-default-no' };
      const { setFiltersInUrl } = useLinPulsarFilterUrl(router, route);

      const filters = [createFilter('status', 'active')];

      setFiltersInUrl(filters, []);

      expect(router.replace).toHaveBeenCalledWith({
        query: { status: ['active'] },
      });
    });

    it('should keep existing query params whose key is listed in keeps', () => {
      route.query = { page: '2', sort: 'asc', status: 'old-value' };
      const { setFiltersInUrl } = useLinPulsarFilterUrl(router, route);

      const filters = [createFilter('status', 'active')];

      setFiltersInUrl(filters, ['page', 'sort']);

      expect(router.replace).toHaveBeenCalledWith({
        query: {
          page: '2',
          sort: 'asc',
          status: ['active'],
        },
      });
    });

    it('should not keep query params whose key is not listed in keeps', () => {
      route.query = { page: '2', status: 'old-value' };
      const { setFiltersInUrl } = useLinPulsarFilterUrl(router, route);

      setFiltersInUrl([], ['sort']);

      expect(router.replace).toHaveBeenCalledWith({
        query: {},
      });
    });

    it('should group multiple filters sharing the same name into an array', () => {
      const { setFiltersInUrl } = useLinPulsarFilterUrl(router, route);

      const filters = [
        createFilter('status', 'active'),
        createFilter('status', 'pending'),
      ];

      setFiltersInUrl(filters, []);

      expect(router.replace).toHaveBeenCalledWith({
        query: { status: ['active', 'pending'] },
      });
    });

    it('should group more than two filters sharing the same name into a single array', () => {
      const { setFiltersInUrl } = useLinPulsarFilterUrl(router, route);

      const filters = [
        createFilter('status', 'active'),
        createFilter('status', 'pending'),
        createFilter('status', 'closed'),
      ];

      setFiltersInUrl(filters, []);

      expect(router.replace).toHaveBeenCalledWith({
        query: { status: ['active', 'pending', 'closed'] },
      });
    });

    it('should handle multiple distinct filter names independently', () => {
      const { setFiltersInUrl } = useLinPulsarFilterUrl(router, route);

      const filters = [
        createFilter('status', 'active'),
        createFilter('owner', 'alice'),
      ];

      setFiltersInUrl(filters, []);

      expect(router.replace).toHaveBeenCalledWith({
        query: {
          status: ['active'],
          owner: ['alice'],
        },
      });
    });

    it('should call router.replace with an empty query when there are no filters and nothing to keep', () => {
      const { setFiltersInUrl } = useLinPulsarFilterUrl(router, route);

      setFiltersInUrl([], []);

      expect(router.replace).toHaveBeenCalledWith({ query: {} });
    });
  });

  describe('getFiltersFromUrl', () => {
    it('should return an empty array when the route has no query params', () => {
      const { getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      expect(getFiltersFromUrl(knownFilters)).toEqual([]);
    });

    it('should ignore query params whose key does not match any known filter name', () => {
      route.query = { unknown: 'value' };
      const { getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      expect(getFiltersFromUrl(knownFilters)).toEqual([]);
      expect(LinPulsarFilter.fromString).not.toHaveBeenCalled();
    });

    it('should extract a single filter from a single-value query param', () => {
      route.query = { status: 'active' };
      const { getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      const result = getFiltersFromUrl(knownFilters);

      expect(LinPulsarFilter.fromString).toHaveBeenCalledWith(
        'status',
        'active',
        knownFilters[0]
      );
      expect(result).toEqual([{ name: 'status', value: 'active' }]);
    });

    it('should rebuild each filter from its own definition', () => {
      route.query = { status: 'active', city: 'paris' };
      const { getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);

      const knownFilters = [createFilter('status', ''), createFilter('city', '')];

      getFiltersFromUrl(knownFilters);

      expect(LinPulsarFilter.fromString).toHaveBeenCalledWith(
        'status',
        'active',
        knownFilters[0]
      );
      expect(LinPulsarFilter.fromString).toHaveBeenCalledWith(
        'city',
        'paris',
        knownFilters[1]
      );
    });

    it('should extract one filter per value when the query param is an array', () => {
      route.query = { status: ['active', 'pending'] };
      const { getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      const result = getFiltersFromUrl(knownFilters);

      expect(LinPulsarFilter.fromString).toHaveBeenCalledTimes(2);
      expect(LinPulsarFilter.fromString).toHaveBeenNthCalledWith(
        1,
        'status',
        'active',
        knownFilters[0]
      );
      expect(LinPulsarFilter.fromString).toHaveBeenNthCalledWith(
        2,
        'status',
        'pending',
        knownFilters[0]
      );
      expect(result).toEqual([
        { name: 'status', value: 'active' },
        { name: 'status', value: 'pending' },
      ]);
    });

    it('should ignore null values on a single-value query param', () => {
      route.query = { status: null };
      const { getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      const result = getFiltersFromUrl(knownFilters);

      expect(LinPulsarFilter.fromString).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should ignore null values within an array query param while keeping the others', () => {
      route.query = { status: ['active', null, 'pending'] };
      const { getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      const result = getFiltersFromUrl(knownFilters);

      expect(LinPulsarFilter.fromString).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        { name: 'status', value: 'active' },
        { name: 'status', value: 'pending' },
      ]);
    });

    it('should extract filters for multiple distinct matching query param keys', () => {
      route.query = { status: 'active', owner: 'alice' };
      const { getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);

      const knownFilters = [
        createFilter('status', ''),
        createFilter('owner', ''),
      ];

      const result = getFiltersFromUrl(knownFilters);

      expect(result).toEqual([
        { name: 'status', value: 'active' },
        { name: 'owner', value: 'alice' },
      ]);
    });
  });
});
