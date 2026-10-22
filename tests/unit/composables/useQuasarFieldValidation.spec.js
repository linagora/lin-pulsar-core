import { useQuasarFieldValidation } from 'src/composables/useQuasarFieldValidation';
import { validate } from 'src/services/linPulsarEntityService';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockT = vi.fn((key, params) => {
  if (params) {
    return `translated.${key}.${JSON.stringify(params)}`;
  }
  return `translated.${key}`;
});
vi.mock('src/services/linPulsarEntityService');

vi.mock('src/services/dayjsService', async () => {
  const { default: dayjsFn } = await vi.importActual('dayjs');
  const { default: customParseFormat } = await vi.importActual(
    'dayjs/plugin/customParseFormat'
  );
  dayjsFn.extend(customParseFormat);
  return { getDayjsInstance: () => dayjsFn };
});

vi.mock('src/composables/useScopedI18n', async () => {
  const actual = await vi.importActual('src/composables/useScopedI18n');
  return {
    ...actual,
    useScopedI18n: () => ({
      t: mockT,
    }),
  };
});

describe('Test composable: useQuasarFieldValidation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return validators in Quasar format', () => {
    const validators = useQuasarFieldValidation(
      'test-instance.fields.username'
    );

    expect(validators).toHaveProperty('required');
    expect(validators).toHaveProperty('email');
    expect(validators).toHaveProperty('validateFromApi');
    expect(validators).toHaveProperty('min');
    expect(validators).toHaveProperty('max');
    expect(validators).toHaveProperty('minLength');
    expect(validators).toHaveProperty('maxLength');
    expect(validators).toHaveProperty('pattern');
    expect(validators).toHaveProperty('unique');
    expect(validators).toHaveProperty('maxFileSize');
    expect(validators).toHaveProperty('allowedExtensions');
    expect(validators).toHaveProperty('validDate');
    expect(validators).toHaveProperty('afterDate');
    expect(validators).toHaveProperty('beforeDate');
    expect(validators).toHaveProperty('fromDate');
    expect(validators).toHaveProperty('upToDate');
  });

  describe('Test function: validateFromApi', () => {
    it('should delegate to the field validation service with instanceId and fieldName', async () => {
      vi.mocked(validate).mockResolvedValue({});

      const { validateFromApi } = useQuasarFieldValidation(
        'test-instance.fields.username'
      );
      const result = await validateFromApi('test-instance', 'username')('john');

      expect(result).toBe(true);
      expect(validate).toHaveBeenCalledWith(
        'test-instance',
        'username',
        'john'
      );
    });
  });

  it('should return curried functions for validators with parameters', () => {
    const { minLength, maxLength, min, max, pattern, unique } =
      useQuasarFieldValidation('test-instance.fields.username');

    const minLengthValidator = minLength(5);
    expect(minLengthValidator('abc')).toBe(
      'translated.validation.minLength.{"min":5}'
    );
    expect(minLengthValidator('abcde')).toBe(true);

    const maxLengthValidator = maxLength(5);
    expect(maxLengthValidator('abcdef')).toBe(
      'translated.validation.maxLength.{"max":5}'
    );
    expect(maxLengthValidator('abc')).toBe(true);

    const minValidator = min(18);
    expect(minValidator(15)).toBe('translated.validation.min.{"min":18}');
    expect(minValidator(20)).toBe(true);

    const maxValidator = max(100);
    expect(maxValidator(150)).toBe('translated.validation.max.{"max":100}');
    expect(maxValidator(50)).toBe(true);

    const patternValidator = pattern('^[a-z]+$');
    expect(patternValidator('abc')).toBe(true);
    expect(patternValidator('123')).toContain('translated.validation.pattern');

    const uniqueValidator = unique(['roleA']);
    expect(uniqueValidator('roleB')).toBe(true);
    expect(uniqueValidator('roleA')).toContain('translated.validation.unique');
  });

  describe('Test function: maxFileSize', () => {
    it('should return a curried validator bound to the maximum size in megabytes', () => {
      const { maxFileSize } = useQuasarFieldValidation(
        'test-instance.fields.avatar'
      );

      const maxFileSizeValidator = maxFileSize(1);
      expect(maxFileSizeValidator(new globalThis.File(['a'], 'a.png'))).toBe(
        true
      );
      expect(
        maxFileSizeValidator(
          new globalThis.File(['a'.repeat(1024 * 1024 + 1)], 'a.png')
        )
      ).toBe('translated.validation.maxFileSize.{"maxFileSize":1}');
      expect(maxFileSizeValidator(null)).toBe(true);
      expect(
        maxFileSizeValidator([
          new globalThis.File(['a'], 'a.png'),
          new globalThis.File(['a'.repeat(1024 * 1024 + 1)], 'b.png'),
        ])
      ).toBe('translated.validation.maxFileSize.{"maxFileSize":1}');
    });
  });

  describe('Test function: allowedExtensions', () => {
    it('should return a curried validator bound to the allowed extensions', () => {
      const { allowedExtensions } = useQuasarFieldValidation(
        'test-instance.fields.avatar'
      );

      const allowedExtensionsValidator = allowedExtensions(['png']);
      expect(
        allowedExtensionsValidator(new globalThis.File([''], 'a.PNG'))
      ).toBe(true);
      expect(
        allowedExtensionsValidator(new globalThis.File([''], 'a.gif'))
      ).toBe('translated.validation.allowedExtensions.{"extensions":"png"}');
      expect(allowedExtensionsValidator(null)).toBe(true);
      expect(
        allowedExtensionsValidator([
          new globalThis.File([''], 'a.png'),
          new globalThis.File([''], 'b.gif'),
        ])
      ).toBe('translated.validation.allowedExtensions.{"extensions":"png"}');
    });
  });

  describe('Test function: min', () => {
    it('should handle string values for min validator', () => {
      const { min } = useQuasarFieldValidation('test-instance.fields.age');

      const minValidator = min(18);
      expect(minValidator('15')).toBe('translated.validation.min.{"min":18}');
      expect(minValidator('20')).toBe(true);
      expect(minValidator('18.5')).toBe(true);
    });
  });

  describe('Test function: max', () => {
    it('should handle string values for max validator', () => {
      const { max } = useQuasarFieldValidation('test-instance.fields.age');

      const maxValidator = max(100);
      expect(maxValidator('150')).toBe('translated.validation.max.{"max":100}');
      expect(maxValidator('50')).toBe(true);
      expect(maxValidator('99.5')).toBe(true);
    });
  });

  describe('Test function: email', () => {
    it('should expose a Quasar-compatible email rule', () => {
      const { email } = useQuasarFieldValidation('test-instance.fields.email');

      expect(email('john.doe@example.com')).toBe(true);
      expect(email('foo')).toBe('translated.validation.email');
      expect(email(undefined)).toBe(true);
    });
  });

  describe('Test function: validDate', () => {
    it('should return a curried validator that accepts a valid date string', () => {
      const { validDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = validDate('YYYY-MM-DD');
      expect(validator('2026-04-30')).toBe(true);
    });

    it('should return a curried validator that rejects a date string not matching the format', () => {
      const { validDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = validDate('YYYY-MM-DD');
      expect(validator('30/04/2026')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
    });

    it('should return a curried validator that rejects a calendrically invalid date', () => {
      const { validDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = validDate('YYYY-MM-DD');
      expect(validator('2026-02-30')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
    });

    it('should use the default format when no format is provided', () => {
      const { validDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = validDate();
      expect(validator('2099/04/30')).toBe(true);
      expect(validator('2000-01-01')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY/MM/DD"}'
      );
    });

    it('should treat an empty string format like an omitted format and use the wrapper default', () => {
      const { validDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = validDate('');
      expect(validator('2099/04/30')).toBe(true);
      expect(validator('2099-04-30')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY/MM/DD"}'
      );
    });
  });

  describe('Test function: afterDate', () => {
    it('should return a curried validator that accepts a date strictly after compareTo', () => {
      const { afterDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = afterDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-16')).toBe(true);
    });

    it('should return a curried validator that rejects a date equal to compareTo', () => {
      const { afterDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = afterDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-15')).toBe(
        'translated.validation.afterDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should return a curried validator that rejects a date before compareTo', () => {
      const { afterDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = afterDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-14')).toBe(
        'translated.validation.afterDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should return true for null, undefined or empty string', () => {
      const { afterDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = afterDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator(null)).toBe(true);
      expect(validator(undefined)).toBe(true);
      expect(validator('')).toBe(true);
    });

    it('should return true for an unparseable or calendrically invalid string', () => {
      const { afterDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = afterDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('not-a-date')).toBe(true);
      expect(validator('2026-02-30')).toBe(true);
    });

    it('should use QDATE_DEFAULT_MASK when no format is provided', () => {
      const { afterDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = afterDate('2026/06/15');
      expect(validator('2026/06/16')).toBe(true);
      expect(validator('2026/06/14')).toBe(
        'translated.validation.afterDate.{"compareTo":"2026/06/15"}'
      );
    });
  });

  describe('Test function: beforeDate', () => {
    it('should return a curried validator that accepts a date strictly before compareTo', () => {
      const { beforeDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = beforeDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-14')).toBe(true);
    });

    it('should return a curried validator that rejects a date equal to compareTo', () => {
      const { beforeDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = beforeDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-15')).toBe(
        'translated.validation.beforeDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should return a curried validator that rejects a date after compareTo', () => {
      const { beforeDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = beforeDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-16')).toBe(
        'translated.validation.beforeDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should return true for null, undefined or empty string', () => {
      const { beforeDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = beforeDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator(null)).toBe(true);
      expect(validator(undefined)).toBe(true);
      expect(validator('')).toBe(true);
    });

    it('should return true for an unparseable or calendrically invalid string', () => {
      const { beforeDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = beforeDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('not-a-date')).toBe(true);
      expect(validator('2026-02-30')).toBe(true);
    });

    it('should use QDATE_DEFAULT_MASK when no format is provided', () => {
      const { beforeDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = beforeDate('2026/06/15');
      expect(validator('2026/06/14')).toBe(true);
      expect(validator('2026/06/16')).toBe(
        'translated.validation.beforeDate.{"compareTo":"2026/06/15"}'
      );
    });
  });

  describe('Test function: fromDate', () => {
    it('should return a curried validator that accepts a date on the same day as compareTo', () => {
      const { fromDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = fromDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-15')).toBe(true);
    });

    it('should return a curried validator that accepts a date after compareTo', () => {
      const { fromDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = fromDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-16')).toBe(true);
    });

    it('should return a curried validator that rejects a date before compareTo', () => {
      const { fromDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = fromDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-14')).toBe(
        'translated.validation.fromDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should return true for null, undefined or empty string', () => {
      const { fromDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = fromDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator(null)).toBe(true);
      expect(validator(undefined)).toBe(true);
      expect(validator('')).toBe(true);
    });

    it('should return true for an unparseable or calendrically invalid string', () => {
      const { fromDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = fromDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('not-a-date')).toBe(true);
      expect(validator('2026-02-30')).toBe(true);
    });

    it('should use QDATE_DEFAULT_MASK when no format is provided', () => {
      const { fromDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = fromDate('2026/06/15');
      expect(validator('2026/06/15')).toBe(true);
      expect(validator('2026/06/14')).toBe(
        'translated.validation.fromDate.{"compareTo":"2026/06/15"}'
      );
    });
  });

  describe('Test function: upToDate', () => {
    it('should return a curried validator that accepts a date on the same day as compareTo', () => {
      const { upToDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = upToDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-15')).toBe(true);
    });

    it('should return a curried validator that accepts a date before compareTo', () => {
      const { upToDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = upToDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-14')).toBe(true);
    });

    it('should return a curried validator that rejects a date after compareTo', () => {
      const { upToDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = upToDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('2026-06-16')).toBe(
        'translated.validation.upToDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should return true for null, undefined or empty string', () => {
      const { upToDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = upToDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator(null)).toBe(true);
      expect(validator(undefined)).toBe(true);
      expect(validator('')).toBe(true);
    });

    it('should return true for an unparseable or calendrically invalid string', () => {
      const { upToDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = upToDate('2026-06-15', 'YYYY-MM-DD');
      expect(validator('not-a-date')).toBe(true);
      expect(validator('2026-02-30')).toBe(true);
    });

    it('should use QDATE_DEFAULT_MASK when no format is provided', () => {
      const { upToDate } = useQuasarFieldValidation(
        'test-instance.fields.date'
      );

      const validator = upToDate('2026/06/15');
      expect(validator('2026/06/15')).toBe(true);
      expect(validator('2026/06/16')).toBe(
        'translated.validation.upToDate.{"compareTo":"2026/06/15"}'
      );
    });
  });
});
