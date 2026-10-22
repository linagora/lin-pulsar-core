import { LinPulsarFilter } from 'src/filters/linPulsarFilter.ts';
import { LinPulsarFilterValue } from 'src/filters/linPulsarFilterValue.ts';
import { describe, expect, it } from 'vitest';

describe('Test class: LinPulsarFilter', () => {
  describe('test constructor', () => {
    it('auto generates a unique id for each instance', () => {
      const first = new LinPulsarFilter('city', 'text', {}, []);
      const second = new LinPulsarFilter('city', 'text', {}, []);

      expect(first.id).toEqual(expect.any(String));
      expect(first.id).not.toBe('');
      expect(first.id).not.toBe(second.id);
    });

    it('stores the given dynamic label options', () => {
      const dynamicLabelOptions = {
        url: '/organizational-units?ids={{ values | join("|") }}',
        responseItemsPath: 'content',
        valuePath: 'id',
      };
      const filter = new LinPulsarFilter(
        'organizationalUnit',
        'tree',
        {},
        [],
        dynamicLabelOptions
      );

      expect(filter.dynamicLabelOptions).toEqual(dynamicLabelOptions);
    });

    it('leaves dynamic label options undefined when none is given', () => {
      const filter = new LinPulsarFilter('city', 'text', {}, []);

      expect(filter.dynamicLabelOptions).toBeUndefined();
    });
  });

  describe('test method: fromString', () => {
    it('parses a single value with no operator and no negation', () => {
      const result = LinPulsarFilter.fromString('city', 'paris');

      expect(result.values).toEqual([new LinPulsarFilterValue(false, '', 'paris')]);
    });

    it('parses multiple values separated by the OR separator', () => {
      const result = LinPulsarFilter.fromString('city', 'paris|lyon');

      expect(result.values).toEqual([
        new LinPulsarFilterValue(false, '', 'paris'),
        new LinPulsarFilterValue(false, '', 'lyon'),
      ]);
    });

    it('parses values with operators and negation', () => {
      const result = LinPulsarFilter.fromString('age', 'gt_18|not_lt_65');

      expect(result.values).toEqual([
        new LinPulsarFilterValue(false, 'gt_', '18'),
        new LinPulsarFilterValue(true, 'lt_', '65'),
      ]);
    });

    it('uses the given name for the resulting filter', () => {
      const result = LinPulsarFilter.fromString('city', 'paris');

      expect(result.name).toBe('city');
    });

    it('returns an empty values array for an empty string', () => {
      const result = LinPulsarFilter.fromString('city', '');

      expect(result.values).toEqual([]);
    });

    it('restores the type, options and dynamic label options of the given definition', () => {
      const dynamicLabelOptions = {
        url: "/organizational-units?id={{ values | join('|') }}",
        responseItemsPath: 'content',
        valuePath: 'id',
      };
      const definition = new LinPulsarFilter(
        'organizationalUnit',
        'tree',
        { url: '/organizational-units' },
        [],
        dynamicLabelOptions
      );

      const result = LinPulsarFilter.fromString(
        'organizationalUnit',
        '1|2',
        definition
      );

      expect(result.type).toBe('tree');
      expect(result.options).toEqual({ url: '/organizational-units' });
      expect(result.dynamicLabelOptions).toEqual(dynamicLabelOptions);
      expect(result.values).toEqual([
        new LinPulsarFilterValue(false, '', '1'),
        new LinPulsarFilterValue(false, '', '2'),
      ]);
    });

    it('keeps the given name over the one of the definition', () => {
      const definition = new LinPulsarFilter('other', 'tree', {}, []);

      expect(LinPulsarFilter.fromString('city', 'paris', definition).name).toBe(
        'city'
      );
    });

    it('falls back to placeholders when no definition is given', () => {
      const result = LinPulsarFilter.fromString('city', 'paris');

      expect(result.type).toBe('text');
      expect(result.options).toEqual({});
      expect(result.dynamicLabelOptions).toBeUndefined();
    });

    it('returns an empty values array for any non-string input', () => {
      [null, undefined, 42, false, {}, []].forEach((input) => {
        const result = LinPulsarFilter.fromString('city', input);

        expect(result.values).toEqual([]);
      });
    });
  });

  describe('test method: toString', () => {
    it('reconstructs the query parameter value when there are no values', () => {
      const filter = new LinPulsarFilter('city', 'text', {}, []);

      expect(filter.toString()).toBe('');
    });

    it('reconstructs a single value as a query parameter pair', () => {
      const filter = new LinPulsarFilter('city', 'text', {}, [
        new LinPulsarFilterValue(false, '', 'paris'),
      ]);

      expect(filter.toString()).toBe('paris');
    });

    it('reconstructs multiple values joined by the OR separator', () => {
      const filter = new LinPulsarFilter('city', 'text', {}, [
        new LinPulsarFilterValue(false, '', 'paris'),
        new LinPulsarFilterValue(true, 'lk_', 'lyon'),
      ]);

      expect(filter.toString()).toBe('paris|not_lk_lyon');
    });

    it('ignores the dynamic label options and the resolved items', () => {
      const filter = new LinPulsarFilter(
        'organizationalUnit',
        'tree',
        {},
        [
          new LinPulsarFilterValue(false, '', '1', { id: 1, name: 'toto' }),
          new LinPulsarFilterValue(false, '', '2', { id: 2, name: 'tata' }),
        ],
        { url: '/organizational-units/{{ value }}', multipleRequests: true }
      );

      expect(filter.toString()).toBe('1|2');
    });
  });
});
