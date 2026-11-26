import { usePagination } from 'src/composables/usePagination';
import { describe, expect, it } from 'vitest';

describe('Test composable: usePagination', () => {
  describe('Test function: toPagination', () => {
    it('should map to valid pagination', () => {
      const { toPagination } = usePagination();

      let result = toPagination({
        page: 1,
        rowsPerPage: 5,
        sortBy: null,
        descending: false,
      });
      expect(result).toStrictEqual({
        page: 0,
        size: 5,
      });

      result = toPagination({
        page: 1,
        rowsPerPage: 5,
        sortBy: 'test',
        descending: true,
      });
      expect(result).toEqual({
        page: 0,
        size: 5,
        sort: 'test,desc',
      });
    });

    it('should combine the sort column and the direction in a single sort field', () => {
      const { toPagination } = usePagination();

      expect(
        toPagination({
          page: 3,
          rowsPerPage: 10,
          sortBy: 'name',
          descending: false,
        }).sort
      ).toBe('name,asc');

      expect(
        toPagination({
          page: 3,
          rowsPerPage: 10,
          sortBy: 'name',
          descending: true,
        }).sort
      ).toBe('name,desc');
    });

    it('should omit the sort when no sort column is active, whatever the direction', () => {
      const { toPagination } = usePagination();

      expect(
        toPagination({
          page: 1,
          rowsPerPage: 5,
          sortBy: null,
          descending: true,
        })
      ).not.toHaveProperty('sort');
      expect(
        toPagination({
          page: 1,
          rowsPerPage: 5,
          sortBy: undefined,
          descending: true,
        })
      ).not.toHaveProperty('sort');
      expect(
        toPagination({ page: 1, rowsPerPage: 5, sortBy: '', descending: true })
      ).not.toHaveProperty('sort');
    });

    it('should return the default values when no input is provided', () => {
      const { toPagination } = usePagination();

      const result = toPagination({});
      expect(result).toStrictEqual({
        page: 0,
        size: 5,
      });
    });
  });

  describe('Test function: toQuasarPagination', () => {
    it('should map to valid pagination', () => {
      const { toQuasarPagination } = usePagination();

      const result = toQuasarPagination(
        { number: 1, size: 5, totalElements: 6 },
        { page: 1, rowsPerPage: 5, sortBy: null, descending: false }
      );
      expect(result).toEqual({
        page: 2,
        rowsPerPage: 5,
        rowsNumber: 6,
        sortBy: null,
        descending: false,
      });
    });

    it('should keep the sort state of the current pagination', () => {
      const { toQuasarPagination } = usePagination();

      const result = toQuasarPagination(
        { number: 0, size: 50, totalElements: 1 },
        { page: 2, rowsPerPage: 5, sortBy: 'name', descending: false }
      );
      expect(result).toEqual({
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 1,
        sortBy: 'name',
        descending: false,
      });
    });

    it('should keep a descending sort state', () => {
      const { toQuasarPagination } = usePagination();

      const result = toQuasarPagination(
        { number: 0, size: 10, totalElements: 3 },
        { page: 1, rowsPerPage: 10, sortBy: 'updateDate', descending: true }
      );
      expect(result).toEqual({
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 3,
        sortBy: 'updateDate',
        descending: true,
      });
    });

    it('should normalize a cleared sort state to null', () => {
      const { toQuasarPagination } = usePagination();

      const result = toQuasarPagination(
        { number: 0, size: 10, totalElements: 3 },
        { page: 1, rowsPerPage: 10, sortBy: undefined, descending: false }
      );
      expect(result).toHaveProperty('sortBy', null);
      expect(result).toHaveProperty('descending', false);
    });

    it('should keep the direction even when the current sort is inactive', () => {
      const { toQuasarPagination } = usePagination();

      const result = toQuasarPagination(
        { number: 0, size: 10, totalElements: 3 },
        { page: 1, rowsPerPage: 10, sortBy: null, descending: true }
      );
      expect(result).toHaveProperty('sortBy', null);
      expect(result).toHaveProperty('descending', true);
    });
  });
});
