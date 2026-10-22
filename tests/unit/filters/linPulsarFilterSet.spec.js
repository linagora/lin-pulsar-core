import { LinPulsarFilter } from 'src/filters/linPulsarFilter.ts';
import { LinPulsarFilterSet } from 'src/filters/linPulsarFilterSet.ts';
import { LinPulsarFilterValue } from 'src/filters/linPulsarFilterValue.ts';
import { describe, expect, it } from 'vitest';

describe('Test class: LinPulsarFilterSet', () => {
  describe('test constructor', () => {
    it('keeps the given label and filters', () => {
      const filters = [
        new LinPulsarFilter('status', 'text', {}, [
          new LinPulsarFilterValue(false, '', 'active'),
        ]),
      ];

      const filterSet = new LinPulsarFilterSet('id', 'My Active Projects', filters);

      expect(filterSet.id).toBe('id');
      expect(filterSet.label).toBe('My Active Projects');
      expect(filterSet.filters).toBe(filters);
    });
  });

  describe('test method: fromString', () => {
    it('returns an empty filter set for an empty string', () => {
      const result = LinPulsarFilterSet.fromString('id','My Favorite', '');

      expect(result.id).toBe('id');
      expect(result.label).toBe('My Favorite');
      expect(result.filters).toEqual([]);
    });

    it('returns an empty filter set for null (e.g. localStorage.getItem with no stored value)', () => {
      const result = LinPulsarFilterSet.fromString('id', 'My Favorite', null);

      expect(result.id).toBe('id');
      expect(result.label).toBe('My Favorite');
      expect(result.filters).toEqual([]);
    });

    it('returns an empty filter set for undefined', () => {
      const result = LinPulsarFilterSet.fromString('id', 'My Favorite', undefined);

      expect(result.id).toBe('id');
      expect(result.label).toBe('My Favorite');
      expect(result.filters).toEqual([]);
    });

    it('returns an empty filter set for any non-string value', () => {
      [42, false, {}, []].forEach((value) => {
        const result = LinPulsarFilterSet.fromString('id', 'My Favorite', value);

        expect(result.filters).toEqual([]);
      });
    });

    it('parses a single filter', () => {
      const result = LinPulsarFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active'
      );

      expect(result.filters).toHaveLength(1);
      expect(result.filters[0].name).toBe('status');
      expect(result.filters[0].values).toEqual([
        new LinPulsarFilterValue(false, '', 'active'),
      ]);
    });

    it('parses multiple filters separated by &', () => {
      const result = LinPulsarFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active&createdAt=gt_2026-01-01'
      );

      expect(result.filters).toHaveLength(2);
      expect(result.filters[0].name).toBe('status');
      expect(result.filters[0].values).toEqual([
        new LinPulsarFilterValue(false, '', 'active'),
      ]);
      expect(result.filters[1].name).toBe('createdAt');
      expect(result.filters[1].values).toEqual([
        new LinPulsarFilterValue(false, 'gt_', '2026-01-01'),
      ]);
    });

    it('ignores a pair with no "=" instead of guessing a name and value', () => {
      const result = LinPulsarFilterSet.fromString('id', 'My Favorite', 'status');

      expect(result.filters).toEqual([]);
    });

    it('ignores only the malformed pair among otherwise valid ones', () => {
      const result = LinPulsarFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active&broken&createdAt=gt_2026-01-01'
      );

      expect(result.filters).toHaveLength(2);
      expect(result.filters[0].name).toBe('status');
      expect(result.filters[1].name).toBe('createdAt');
    });

    it('supports multiple OR-ed values per filter', () => {
      const result = LinPulsarFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active|pending'
      );

      expect(result.filters).toHaveLength(1);
      expect(result.filters[0].values).toEqual([
        new LinPulsarFilterValue(false, '', 'active'),
        new LinPulsarFilterValue(false, '', 'pending'),
      ]);
    });

    it('parses negated values reusing LinPulsarFilterValue.fromString', () => {
      const result = LinPulsarFilterSet.fromString(
        'id',
        'My Favorite',
        'name=not_lk_paris'
      );

      expect(result.filters[0].values).toEqual([
        new LinPulsarFilterValue(true, 'lk_', 'paris'),
      ]);
    });

    it('keeps the given label', () => {
      const result = LinPulsarFilterSet.fromString(
        'id',
        'My Active Projects',
        'status=active'
      );

      expect(result.label).toBe('My Active Projects');
    });

    it('gives each parsed filter a unique auto generated id', () => {
      const result = LinPulsarFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active&createdAt=gt_2026-01-01'
      );

      expect(result.filters[0].id).toEqual(expect.any(String));
      expect(result.filters[0].id).not.toBe(result.filters[1].id);
    });
  });

    it('restores each parsed filter from the definition carrying the same name', () => {
      const dynamicLabelOptions = { url: '/organizational-units/{{ value }}' };
      const definitions = [
        new LinPulsarFilter(
          'organizationalUnitId',
          'tree',
          { url: '/organizational-units' },
          [],
          dynamicLabelOptions
        ),
      ];

      const result = LinPulsarFilterSet.fromString(
        'fav-1',
        'My favorite',
        'organizationalUnitId=1&status=active',
        definitions
      );

      expect(result.filters[0].type).toBe('tree');
      expect(result.filters[0].options).toEqual({
        url: '/organizational-units',
      });
      expect(result.filters[0].dynamicLabelOptions).toEqual(
        dynamicLabelOptions
      );
      expect(result.filters[1].type).toBe('text');
      expect(result.filters[1].dynamicLabelOptions).toBeUndefined();
    });

  describe('test method: toString', () => {
    it('reconstructs an empty string when there are no filters', () => {
      const filterSet = new LinPulsarFilterSet('id', 'My Favorite', []);

      expect(filterSet.toString()).toBe('');
    });

    it('reconstructs a single filter', () => {
      const filterSet = new LinPulsarFilterSet('id', 'My Favorite', [
        new LinPulsarFilter('status', 'text', {}, [
          new LinPulsarFilterValue(false, '', 'active'),
        ]),
      ]);

      expect(filterSet.toString()).toBe('status=active');
    });

    it('reconstructs multiple filters joined by &', () => {
      const filterSet = new LinPulsarFilterSet('id', 'My Favorite', [
        new LinPulsarFilter('status', 'text', {}, [
          new LinPulsarFilterValue(false, '', 'active'),
        ]),
        new LinPulsarFilter('createdAt', 'date', {}, [
          new LinPulsarFilterValue(false, 'gt_', '2026-01-01'),
        ]),
      ]);

      expect(filterSet.toString()).toBe(
        'status=active&createdAt=gt_2026-01-01'
      );
    });

    it('reconstructs multiple OR-ed values per filter', () => {
      const filterSet = new LinPulsarFilterSet('id', 'My Favorite', [
        new LinPulsarFilter('status', 'text', {}, [
          new LinPulsarFilterValue(false, '', 'active'),
          new LinPulsarFilterValue(false, '', 'pending'),
        ]),
      ]);

      expect(filterSet.toString()).toBe('status=active|pending');
    });
  });
});
