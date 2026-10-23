import { LinPulsarFilterValue } from 'src/filters/linPulsarFilterValue.ts';
import { describe, expect, it } from 'vitest';

describe('Test class: LinPulsarFilterValue', () => {
  describe('test constructor', () => {
    it('stores the given resolved item', () => {
      const item = { id: 123, name: 'Paris' };
      const value = new LinPulsarFilterValue(false, '', '123', item);

      expect(value.value).toBe('123');
      expect(value.item).toEqual(item);
    });

    it('leaves the item undefined when none is given', () => {
      const value = new LinPulsarFilterValue(false, '', '123');

      expect(value.item).toBeUndefined();
    });
  });

  describe('test method: fromString', () => {
    it.each([
      { input: 'paris', isNegation: false, operator: '', value: 'paris' },
      { input: 'lk_paris', isNegation: false, operator: 'lk_', value: 'paris' },
      { input: 'gt_18', isNegation: false, operator: 'gt_', value: '18' },
      { input: 'lt_18', isNegation: false, operator: 'lt_', value: '18' },
      { input: 'not_paris', isNegation: true, operator: '', value: 'paris' },
      {
        input: 'not_lk_paris',
        isNegation: true,
        operator: 'lk_',
        value: 'paris',
      },
    ])(
      'parses "$input" -> isNegation=$isNegation, operator="$operator", value="$value"',
      ({ input, isNegation, operator, value }) => {
        const result = LinPulsarFilterValue.fromString(input);

        expect(result.isNegation).toBe(isNegation);
        expect(result.operator).toBe(operator);
        expect(result.value).toBe(value);
      }
    );

    it('leaves the item undefined, as it is not part of the expression', () => {
      const result = LinPulsarFilterValue.fromString('not_lk_paris');

      expect(result.item).toBeUndefined();
    });

    it('keeps an empty value as-is', () => {
      const result = LinPulsarFilterValue.fromString('');

      expect(result.isNegation).toBe(false);
      expect(result.operator).toBe('');
      expect(result.value).toBe('');
    });

    it('treats an operator-like prefix in the middle of the value as part of the value', () => {
      const result = LinPulsarFilterValue.fromString('paris_lk_paris');

      expect(result.isNegation).toBe(false);
      expect(result.operator).toBe('');
      expect(result.value).toBe('paris_lk_paris');
    });

    it('returns a neutral value when input is not a string', () => {
      [null, undefined, 42, false, {}, []].forEach((input) => {
        const result = LinPulsarFilterValue.fromString(input);

        expect(result.isNegation).toBe(false);
        expect(result.operator).toBe('');
        expect(result.value).toBe('');
      });
    });
  });

  describe('test method: toString', () => {
    it('reconstructs a plain value', () => {
      const value = new LinPulsarFilterValue(false, '', 'paris');

      expect(value.toString()).toBe('paris');
    });

    it('reconstructs a value with an operator', () => {
      const value = new LinPulsarFilterValue(false, 'gt_', '18');

      expect(value.toString()).toBe('gt_18');
    });

    it('reconstructs a negated value', () => {
      const value = new LinPulsarFilterValue(true, '', 'paris');

      expect(value.toString()).toBe('not_paris');
    });

    it('reconstructs a negated value with an operator', () => {
      const value = new LinPulsarFilterValue(true, 'lk_', 'paris');

      expect(value.toString()).toBe('not_lk_paris');
    });

    it('ignores the resolved item', () => {
      const value = new LinPulsarFilterValue(false, '', '123', {
        id: 123,
        name: 'Paris',
      });

      expect(value.toString()).toBe('123');
    });
  });
});
