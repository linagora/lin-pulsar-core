import { useFieldValidation } from 'src/composables/useFieldValidation';
import { validate } from 'src/services/linPulsarEntityService';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockT = vi.fn((key, params) => {
  if (params) {
    return `translated.${key}.${JSON.stringify(params)}`;
  }
  return `translated.${key}`;
});

vi.mock('src/services/linPulsarEntityService');

vi.mock('src/composables/useDayjs', async () => {
  const { default: dayjsFn } = await vi.importActual('dayjs');
  const { default: customParseFormat } = await vi.importActual(
    'dayjs/plugin/customParseFormat'
  );
  dayjsFn.extend(customParseFormat);
  return {
    DEFAULT_DATE_FORMAT: 'YYYY-MM-DD',
    useDayjs: () => ({
      toDayjs: (value, format) =>
        typeof value === 'string'
          ? dayjsFn(value, format || 'YYYY-MM-DD', true)
          : dayjsFn(value),
      maxDate: () => null,
      minDate: () => null,
    }),
  };
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

describe('Test composable: useFieldValidation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test function: validateFromApi', () => {
    it('should return true when field value is valid', async () => {
      vi.mocked(validate).mockResolvedValue({});

      const { validateFromApi } = useFieldValidation('test-instance.email');
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

      expect(result).toBe(true);
      expect(validate).toHaveBeenCalledWith(
        'test-instance',
        'email',
        'test@example.com'
      );
    });

    it('should return translated error message from backend when available', async () => {
      const backendMessage = 'Email is already taken';
      const mockAxiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {
            error: backendMessage,
          },
        },
      };
      vi.mocked(validate).mockRejectedValue(mockAxiosError);

      const { validateFromApi } = useFieldValidation('test-instance.email');
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

      expect(result).toBe(backendMessage);
    });

    it('should return translated default error message when the error is not an AxiosError', async () => {
      const genericError = new Error('Generic error');
      vi.mocked(validate).mockRejectedValue(genericError);

      const { validateFromApi } = useFieldValidation('test-instance.email');
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

      expect(mockT).toHaveBeenCalledWith('validation.unknownError');
      expect(result).toBe('translated.validation.unknownError');
    });

    it('should return default translated error message when axios error has no status', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        response: undefined,
      };
      vi.mocked(validate).mockRejectedValue(mockAxiosError);

      const { validateFromApi } = useFieldValidation('test-instance.email');
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

      expect(mockT).toHaveBeenCalledWith('validation.unknownError');
      expect(result).toBe('translated.validation.unknownError');
    });

    it('should return default translated error message when axios error has no translated error message available from backend', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        response: {
          status: 500,
        },
      };
      vi.mocked(validate).mockRejectedValue(mockAxiosError);

      const { validateFromApi } = useFieldValidation('test-instance.email');
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

      expect(mockT).toHaveBeenCalledWith('validation.unknownError');
      expect(result).toBe('translated.validation.unknownError');
    });
  });

  describe('Test function: required', () => {
    it('should return true when field has a value', () => {
      const { required } = useFieldValidation('test-instance.email');

      expect(required('test@example.com')).toBe(true);
      expect(required(0)).toBe(true);
      expect(required(false)).toBe(true);
    });

    it('should return error message when field is empty', () => {
      const { required } = useFieldValidation('test-instance.email');

      expect(required('')).toBe('translated.validation.required');
      expect(required(null)).toBe('translated.validation.required');
      expect(required(undefined)).toBe('translated.validation.required');
    });
  });

  describe('Test function: email', () => {
    it('should return true for well-formed email addresses', () => {
      const { email } = useFieldValidation('test-instance.email');

      expect(email('john.doe@example.com')).toBe(true);
      expect(email('a@b.cd')).toBe(true);
    });

    it('should return true for empty values', () => {
      const { email } = useFieldValidation('test-instance.email');

      expect(email('')).toBe(true);
      expect(email(null)).toBe(true);
      expect(email(undefined)).toBe(true);
      expect(mockT).not.toHaveBeenCalled();
    });

    it('should return error message for malformed email addresses', () => {
      const { email } = useFieldValidation('test-instance.email');

      expect(email('foo')).toBe('translated.validation.email');
      expect(email('foo@')).toBe('translated.validation.email');
      expect(email('@bar.tld')).toBe('translated.validation.email');
      expect(email('foo @bar.tld')).toBe('translated.validation.email');
      expect(email('a@b.c')).toBe('translated.validation.email');
      expect(email('foo@bar.123')).toBe('translated.validation.email');
      expect(mockT).toHaveBeenCalledWith('validation.email');
    });

    it('should return error message for non-empty non-string values', () => {
      const { email } = useFieldValidation('test-instance.email');

      expect(email(42)).toBe('translated.validation.email');
      expect(email(true)).toBe('translated.validation.email');
      expect(email({ address: 'john.doe@example.com' })).toBe(
        'translated.validation.email'
      );
    });
  });

  describe('Test function: minLength', () => {
    it('should return true when value meets minimum length', () => {
      const { minLength } = useFieldValidation('test-instance.username');

      expect(minLength('abc', 3)).toBe(true);
      expect(minLength('abcd', 3)).toBe(true);
    });

    it('should return error message when value is too short', () => {
      const { minLength } = useFieldValidation('test-instance.username');

      const result = minLength('abc', 5);
      expect(result).toBe('translated.validation.minLength.{"min":5}');
      expect(mockT).toHaveBeenCalledWith('validation.minLength', { min: 5 });
    });

    it('should return true when value is null or undefined', () => {
      const { minLength } = useFieldValidation('test-instance.username');

      expect(minLength(null, 5)).toBe(true);
      expect(minLength(undefined, 5)).toBe(true);
    });
  });

  describe('Test function: maxLength', () => {
    it('should return true when value does not exceed maximum length', () => {
      const { maxLength } = useFieldValidation('test-instance.username');

      expect(maxLength('abc', 5)).toBe(true);
      expect(maxLength('abcde', 5)).toBe(true);
    });

    it('should return error message when value is too long', () => {
      const { maxLength } = useFieldValidation('test-instance.username');

      const result = maxLength('abcdef', 5);
      expect(result).toBe('translated.validation.maxLength.{"max":5}');
      expect(mockT).toHaveBeenCalledWith('validation.maxLength', { max: 5 });
    });

    it('should return true when value is null or undefined', () => {
      const { maxLength } = useFieldValidation('test-instance.username');

      expect(maxLength(null, 5)).toBe(true);
      expect(maxLength(undefined, 5)).toBe(true);
    });
  });

  describe('Test function: min', () => {
    it('should return true when value meets minimum', () => {
      const { min } = useFieldValidation('test-instance.age');

      expect(min(18, 18)).toBe(true);
      expect(min(25, 18)).toBe(true);
    });

    it('should return error message when value is below minimum', () => {
      const { min } = useFieldValidation('test-instance.age');

      const result = min(15, 18);
      expect(result).toBe('translated.validation.min.{"min":18}');
      expect(mockT).toHaveBeenCalledWith('validation.min', { min: 18 });
    });
  });

  describe('Test function: max', () => {
    it('should return true when value does not exceed maximum', () => {
      const { max } = useFieldValidation('test-instance.age');

      expect(max(50, 100)).toBe(true);
      expect(max(100, 100)).toBe(true);
    });

    it('should return error message when value exceeds maximum', () => {
      const { max } = useFieldValidation('test-instance.age');

      const result = max(150, 100);
      expect(result).toBe('translated.validation.max.{"max":100}');
      expect(mockT).toHaveBeenCalledWith('validation.max', { max: 100 });
    });
  });

  describe('Test function: pattern', () => {
    it('should return true when value matches pattern', () => {
      const { pattern } = useFieldValidation('test-instance.email');

      expect(pattern('test@example.com', '^[a-z]+@[a-z]+\\.[a-z]+$')).toBe(
        true
      );
    });

    it('should return error message when value does not match pattern', () => {
      const { pattern } = useFieldValidation('test-instance.email');
      const patternStr = '^[a-z]+@[a-z]+\\.[a-z]+$';

      const result = pattern('invalid-email', patternStr);
      expect(result).toContain('translated.validation.pattern');
      expect(mockT).toHaveBeenCalledWith('validation.pattern', {
        pattern: patternStr,
      });
    });
  });

  describe('Test function: unique', () => {
    it('should return true when value is unique', () => {
      const { unique } = useFieldValidation('test-instance.roles');

      expect(unique('uniqueRole', ['roleA'])).toBe(true);
    });

    it('should return error message when value is not unique', () => {
      const { unique } = useFieldValidation('test-instance.roles');

      const result = unique('roleA', ['roleA']);
      expect(result).toBe('translated.validation.unique');
      expect(mockT).toHaveBeenCalledWith('validation.unique');
    });

    it('should return true when value is null or undefined', () => {
      const { unique } = useFieldValidation('test-instance.roles');

      expect(unique(null, ['roleA'])).toBe(true);
      expect(unique(undefined, ['roleA'])).toBe(true);
    });

    it('should handle number mixed with string values', () => {
      const { unique } = useFieldValidation('test-instance.roles');

      expect(unique('2', [1, 3])).toBe(true);
      expect(unique('2', [1, 2])).toContain('translated.validation.unique');
    });

    it('should handle object values', () => {
      const { unique } = useFieldValidation('test-instance.roles');

      expect(unique({ name: 'alice' }, [{ name: 'bob' }])).toBe(true);
      expect(unique({ name: 'alice' }, [{ name: 'alice' }])).toBe(
        'translated.validation.unique'
      );
    });

    it('should handle array values', () => {
      const { unique } = useFieldValidation('test-instance.roles');

      expect(
        unique(
          [1, 2],
          [
            [3, 4],
            [5, 6],
          ]
        )
      ).toBe(true);
      expect(
        unique(
          [1, 2],
          [
            [1, 2],
            [3, 4],
          ]
        )
      ).toBe('translated.validation.unique');
    });
  });

  describe('Test function: maxFileSize', () => {
    const megabyte = 1024 * 1024;

    it('should return true when the file is within the maximum size', () => {
      const { maxFileSize } = useFieldValidation('test-instance.avatar');

      expect(
        maxFileSize(new globalThis.File(['a'.repeat(10)], 'a.png'), 1)
      ).toBe(true);
      expect(
        maxFileSize(new globalThis.File(['a'.repeat(megabyte)], 'a.png'), 1)
      ).toBe(true);
    });

    it('should return error message when the file exceeds the maximum size', () => {
      const { maxFileSize } = useFieldValidation('test-instance.avatar');

      const result = maxFileSize(
        new globalThis.File(['a'.repeat(megabyte + 1)], 'a.png'),
        1
      );
      expect(result).toBe(
        'translated.validation.maxFileSize.{"maxFileSize":1}'
      );
      expect(mockT).toHaveBeenCalledWith('validation.maxFileSize', {
        maxFileSize: 1,
      });
    });

    it('should return true when value is null, undefined or an empty selection', () => {
      const { maxFileSize } = useFieldValidation('test-instance.avatar');

      expect(maxFileSize(null, 1)).toBe(true);
      expect(maxFileSize(undefined, 1)).toBe(true);
      expect(maxFileSize([], 1)).toBe(true);
    });

    it('should check every file of a multiple selection', () => {
      const { maxFileSize } = useFieldValidation('test-instance.avatar');
      const small = new globalThis.File(['a'], 'a.png');
      const large = new globalThis.File(['a'.repeat(megabyte + 1)], 'b.png');

      expect(maxFileSize([small, small], 1)).toBe(true);
      expect(maxFileSize([small, large], 1)).toBe(
        'translated.validation.maxFileSize.{"maxFileSize":1}'
      );
    });
  });

  describe('Test function: allowedExtensions', () => {
    it('should return true when the extension is allowed, regardless of case', () => {
      const { allowedExtensions } = useFieldValidation('test-instance.avatar');

      expect(
        allowedExtensions(new globalThis.File([''], 'a.png'), ['png'])
      ).toBe(true);
      expect(
        allowedExtensions(new globalThis.File([''], 'a.PNG'), ['png'])
      ).toBe(true);
      expect(
        allowedExtensions(new globalThis.File([''], 'a.png'), ['.PNG', 'jpg'])
      ).toBe(true);
      expect(
        allowedExtensions(new globalThis.File([''], 'a.tar.gz'), ['gz'])
      ).toBe(true);
    });

    it('should return error message when the extension is not allowed', () => {
      const { allowedExtensions } = useFieldValidation('test-instance.avatar');

      const result = allowedExtensions(new globalThis.File([''], 'a.gif'), [
        '.PNG',
        'jpg',
      ]);
      expect(result).toBe(
        'translated.validation.allowedExtensions.{"extensions":"png, jpg"}'
      );
      expect(mockT).toHaveBeenCalledWith('validation.allowedExtensions', {
        extensions: 'png, jpg',
      });
    });

    it('should return error message when the file name has no extension', () => {
      const { allowedExtensions } = useFieldValidation('test-instance.avatar');

      expect(
        allowedExtensions(new globalThis.File([''], 'avatar'), ['png'])
      ).toBe('translated.validation.allowedExtensions.{"extensions":"png"}');
    });

    it('should return true when no extension is configured', () => {
      const { allowedExtensions } = useFieldValidation('test-instance.avatar');

      expect(allowedExtensions(new globalThis.File([''], 'a.gif'), [])).toBe(
        true
      );
    });

    it('should return true when value is null, undefined or an empty selection', () => {
      const { allowedExtensions } = useFieldValidation('test-instance.avatar');

      expect(allowedExtensions(null, ['png'])).toBe(true);
      expect(allowedExtensions(undefined, ['png'])).toBe(true);
      expect(allowedExtensions([], ['png'])).toBe(true);
    });

    it('should check every file of a multiple selection', () => {
      const { allowedExtensions } = useFieldValidation('test-instance.avatar');
      const png = new globalThis.File([''], 'a.png');
      const gif = new globalThis.File([''], 'b.gif');

      expect(allowedExtensions([png, png], ['png'])).toBe(true);
      expect(allowedExtensions([png, gif], ['png'])).toBe(
        'translated.validation.allowedExtensions.{"extensions":"png"}'
      );
    });
  });

  describe('Test function: validDate', () => {
    it('should return true for a valid date matching the format', () => {
      const { validDate } = useFieldValidation('test-instance.date');

      expect(validDate('2026-04-30', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return error message for a date not matching the format', () => {
      const { validDate } = useFieldValidation('test-instance.date');

      const result = validDate('30/04/2026', 'YYYY-MM-DD');
      expect(result).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
      expect(mockT).toHaveBeenCalledWith('validation.invalidDate', {
        format: 'YYYY-MM-DD',
      });
    });

    it('should return error message for an invalid date string', () => {
      const { validDate } = useFieldValidation('test-instance.date');

      expect(validDate('not-a-date', 'YYYY-MM-DD')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
    });

    it('should return error message for a calendrically invalid date', () => {
      const { validDate } = useFieldValidation('test-instance.date');

      expect(validDate('2026-02-30', 'YYYY-MM-DD')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
    });

    it('should return true for null, undefined or empty string', () => {
      const { validDate } = useFieldValidation('test-instance.date');

      expect(validDate(null, 'YYYY-MM-DD')).toBe(true);
      expect(validDate(undefined, 'YYYY-MM-DD')).toBe(true);
      expect(validDate('', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return true for a non-string value such as a Date object', () => {
      const { validDate } = useFieldValidation('test-instance.date');

      expect(validDate(new Date(), 'YYYY-MM-DD')).toBe(true);
      expect(validDate(42, 'YYYY-MM-DD')).toBe(true);
    });

    it('should use the default format when no format is provided', () => {
      const { validDate } = useFieldValidation('test-instance.date');

      expect(validDate('2026-04-30')).toBe(true);
      expect(validDate('30/04/2026')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
    });

    it('should fall back to the default format when format is an empty string', () => {
      const { validDate } = useFieldValidation('test-instance.date');

      expect(validDate('2026-04-30', '')).toBe(true);
      expect(validDate('30/04/2026', '')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
    });

    it('should reject an ISO 8601 datetime string under the default format', () => {
      const { validDate } = useFieldValidation('test-instance.date');

      expect(validDate('2026-04-30T10:00:00Z')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
    });
  });

  describe('Test function: afterDate', () => {
    it('should return true when value is strictly after compareTo', () => {
      const { afterDate } = useFieldValidation('test-instance.date');

      expect(afterDate('2026-06-16', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return error message when value equals compareTo', () => {
      const { afterDate } = useFieldValidation('test-instance.date');

      const result = afterDate('2026-06-15', '2026-06-15', 'YYYY-MM-DD');
      expect(result).toBe(
        'translated.validation.afterDate.{"compareTo":"2026-06-15"}'
      );
      expect(mockT).toHaveBeenCalledWith('validation.afterDate', {
        compareTo: '2026-06-15',
      });
    });

    it('should return error message when value is before compareTo', () => {
      const { afterDate } = useFieldValidation('test-instance.date');

      expect(afterDate('2026-06-14', '2026-06-15', 'YYYY-MM-DD')).toBe(
        'translated.validation.afterDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should return true for null, undefined or empty string', () => {
      const { afterDate } = useFieldValidation('test-instance.date');

      expect(afterDate(null, '2026-06-15', 'YYYY-MM-DD')).toBe(true);
      expect(afterDate(undefined, '2026-06-15', 'YYYY-MM-DD')).toBe(true);
      expect(afterDate('', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return true when value is unparseable', () => {
      const { afterDate } = useFieldValidation('test-instance.date');

      expect(afterDate('not-a-date', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return true when compareTo is unparseable', () => {
      const { afterDate } = useFieldValidation('test-instance.date');

      expect(afterDate('2026-06-16', 'not-a-date', 'YYYY-MM-DD')).toBe(true);
    });

    it('should use the default format when no format is provided', () => {
      const { afterDate } = useFieldValidation('test-instance.date');

      expect(afterDate('2026-06-16', '2026-06-15')).toBe(true);
      expect(afterDate('2026-06-14', '2026-06-15')).toBe(
        'translated.validation.afterDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should accept a Date object as compareTo and format the date in error message', () => {
      const { afterDate } = useFieldValidation('test-instance.date');
      const compareToDate = new Date(2026, 5, 15, 12);

      expect(afterDate('2026-06-16', compareToDate, 'YYYY-MM-DD')).toBe(true);
      expect(afterDate('2026-06-14', compareToDate, 'YYYY-MM-DD')).toBe(
        'translated.validation.afterDate.{"compareTo":"2026-06-15"}'
      );
    });
  });

  describe('Test function: beforeDate', () => {
    it('should return true when value is strictly before compareTo', () => {
      const { beforeDate } = useFieldValidation('test-instance.date');

      expect(beforeDate('2026-06-14', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return error message when value equals compareTo', () => {
      const { beforeDate } = useFieldValidation('test-instance.date');

      const result = beforeDate('2026-06-15', '2026-06-15', 'YYYY-MM-DD');
      expect(result).toBe(
        'translated.validation.beforeDate.{"compareTo":"2026-06-15"}'
      );
      expect(mockT).toHaveBeenCalledWith('validation.beforeDate', {
        compareTo: '2026-06-15',
      });
    });

    it('should return error message when value is after compareTo', () => {
      const { beforeDate } = useFieldValidation('test-instance.date');

      expect(beforeDate('2026-06-16', '2026-06-15', 'YYYY-MM-DD')).toBe(
        'translated.validation.beforeDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should return true for null, undefined or empty string', () => {
      const { beforeDate } = useFieldValidation('test-instance.date');

      expect(beforeDate(null, '2026-06-15', 'YYYY-MM-DD')).toBe(true);
      expect(beforeDate(undefined, '2026-06-15', 'YYYY-MM-DD')).toBe(true);
      expect(beforeDate('', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return true when value is unparseable', () => {
      const { beforeDate } = useFieldValidation('test-instance.date');

      expect(beforeDate('not-a-date', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return true when compareTo is unparseable', () => {
      const { beforeDate } = useFieldValidation('test-instance.date');

      expect(beforeDate('2026-06-14', 'not-a-date', 'YYYY-MM-DD')).toBe(true);
    });

    it('should use the default format when no format is provided', () => {
      const { beforeDate } = useFieldValidation('test-instance.date');

      expect(beforeDate('2026-06-14', '2026-06-15')).toBe(true);
      expect(beforeDate('2026-06-16', '2026-06-15')).toBe(
        'translated.validation.beforeDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should accept a Date object as compareTo and format the date in error message', () => {
      const { beforeDate } = useFieldValidation('test-instance.date');
      const compareToDate = new Date(2026, 5, 15, 12);

      expect(beforeDate('2026-06-14', compareToDate, 'YYYY-MM-DD')).toBe(true);
      expect(beforeDate('2026-06-16', compareToDate, 'YYYY-MM-DD')).toBe(
        'translated.validation.beforeDate.{"compareTo":"2026-06-15"}'
      );
    });
  });

  describe('Test function: fromDate', () => {
    it.each([
      { value: '2026-06-15', expected: true },
      { value: '2026-06-16', expected: true },
      {
        value: '2026-06-14',
        expected: 'translated.validation.fromDate.{"compareTo":"2026-06-15"}',
      },
    ])(
      'should return $expected for value $value',
      ({ value, expected }) => {
        const { fromDate } = useFieldValidation('test-instance.date');

        const result = fromDate(value, '2026-06-15', 'YYYY-MM-DD');
        expect(result).toBe(expected);
        if (typeof expected === 'string') {
          expect(mockT).toHaveBeenCalledWith('validation.fromDate', {
            compareTo: '2026-06-15',
          });
        }
      }
    );

    it('should return true for null, undefined or empty string', () => {
      const { fromDate } = useFieldValidation('test-instance.date');

      expect(fromDate(null, '2026-06-15', 'YYYY-MM-DD')).toBe(true);
      expect(fromDate(undefined, '2026-06-15', 'YYYY-MM-DD')).toBe(true);
      expect(fromDate('', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return true when value is unparseable', () => {
      const { fromDate } = useFieldValidation('test-instance.date');

      expect(fromDate('not-a-date', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return true when compareTo is unparseable', () => {
      const { fromDate } = useFieldValidation('test-instance.date');

      expect(fromDate('2026-06-16', 'not-a-date', 'YYYY-MM-DD')).toBe(true);
    });

    it('should use the default format when no format is provided', () => {
      const { fromDate } = useFieldValidation('test-instance.date');

      expect(fromDate('2026-06-15', '2026-06-15')).toBe(true);
      expect(fromDate('2026-06-14', '2026-06-15')).toBe(
        'translated.validation.fromDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should accept a Date object as compareTo and format the date in error message', () => {
      const { fromDate } = useFieldValidation('test-instance.date');
      const compareToDate = new Date(2026, 5, 15, 12);

      expect(fromDate('2026-06-15', compareToDate, 'YYYY-MM-DD')).toBe(true);
      expect(fromDate('2026-06-14', compareToDate, 'YYYY-MM-DD')).toBe(
        'translated.validation.fromDate.{"compareTo":"2026-06-15"}'
      );
    });
  });

  describe('Test function: upToDate', () => {
    it.each([
      { value: '2026-06-15', expected: true },
      { value: '2026-06-14', expected: true },
      {
        value: '2026-06-16',
        expected: 'translated.validation.upToDate.{"compareTo":"2026-06-15"}',
      },
    ])(
      'should return $expected for value $value',
      ({ value, expected }) => {
        const { upToDate } = useFieldValidation('test-instance.date');

        const result = upToDate(value, '2026-06-15', 'YYYY-MM-DD');
        expect(result).toBe(expected);
        if (typeof expected === 'string') {
          expect(mockT).toHaveBeenCalledWith('validation.upToDate', {
            compareTo: '2026-06-15',
          });
        }
      }
    );

    it('should return true for null, undefined or empty string', () => {
      const { upToDate } = useFieldValidation('test-instance.date');

      expect(upToDate(null, '2026-06-15', 'YYYY-MM-DD')).toBe(true);
      expect(upToDate(undefined, '2026-06-15', 'YYYY-MM-DD')).toBe(true);
      expect(upToDate('', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return true when value is unparseable', () => {
      const { upToDate } = useFieldValidation('test-instance.date');

      expect(upToDate('not-a-date', '2026-06-15', 'YYYY-MM-DD')).toBe(true);
    });

    it('should return true when compareTo is unparseable', () => {
      const { upToDate } = useFieldValidation('test-instance.date');

      expect(upToDate('2026-06-14', 'not-a-date', 'YYYY-MM-DD')).toBe(true);
    });

    it('should use the default format when no format is provided', () => {
      const { upToDate } = useFieldValidation('test-instance.date');

      expect(upToDate('2026-06-15', '2026-06-15')).toBe(true);
      expect(upToDate('2026-06-16', '2026-06-15')).toBe(
        'translated.validation.upToDate.{"compareTo":"2026-06-15"}'
      );
    });

    it('should accept a Date object as compareTo and format the date in error message', () => {
      const { upToDate } = useFieldValidation('test-instance.date');
      const compareToDate = new Date(2026, 5, 15, 12);

      expect(upToDate('2026-06-15', compareToDate, 'YYYY-MM-DD')).toBe(true);
      expect(upToDate('2026-06-16', compareToDate, 'YYYY-MM-DD')).toBe(
        'translated.validation.upToDate.{"compareTo":"2026-06-15"}'
      );
    });
  });
});
