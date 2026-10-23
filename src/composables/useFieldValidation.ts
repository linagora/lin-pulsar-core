/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for linOpenFactory software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "linOpenFactory™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of linOpenFactory™, powered by
 * Linagora © 2009–2026. Contribute to linOpenFactory R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the linOpenFactory user interface, (ii) retain all hypertext links between linOpenFactory
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * linOpenFactory along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * linOpenFactory software.
 */

import type { AxiosError } from 'axios';
import axios, { HttpStatusCode } from 'axios';
import { validate } from '../services/linPulsarEntityService';
import { deepEqualUnordered } from '../services/objectService';
import type { LinPulsarApiErrorResponseBody } from '../types/linPulsarApi';
import { DEFAULT_DATE_FORMAT, useDayjs } from './useDayjs';
import { useScopedI18n } from './useScopedI18n';

const TRANSLATED_ERROR_STATUSES = new Set([
  HttpStatusCode.BadRequest,
  HttpStatusCode.NotFound,
]);

/**
 * Checks if the given status code corresponds to an error that has a translated message.
 * @param error - The error object to check.
 * @returns `true` if the status code has a translated error message, `false` otherwise.
 */
function hasTranslatedError(error: unknown): error is AxiosError {
  return (
    axios.isAxiosError(error) &&
    error.response?.status != null &&
    TRANSLATED_ERROR_STATUSES.has(error.response.status)
  );
}

/**
 * Normalizes a file field value to the list of selected files.
 * @param value - A single file, the files of a multiple selection, or an empty value.
 * @returns The selected files, empty when the value is empty.
 */
/**
 * Represents a single file, a list of files, or an empty value.
 */
type FileValue = File | File[] | null | undefined;

/**
 * Converts a file value to a normalized array of files.
 * @param value - A single file, the files of a multiple selection, or an empty value.
 * @returns The selected files, empty when the value is empty.
 */
function toFiles(value: FileValue): File[] {
  if (value == null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

/**
 * Extracts the lowercase extension of a file name.
 * @param name - The file name.
 * @returns The extension without its leading dot, or an empty string when the name has none.
 */
function extensionOf(name: string): string {
  return /\.([^.]+)$/.exec(name)?.[1]?.toLowerCase() ?? '';
}

/**
 * Composable for field validation. It exposes various validation methods
 * that can be used to validate form fields.
 * @param i18nScope - I18n scope for localizing the validators.
 * @returns An object containing validation methods.
 */
export function useFieldValidation(i18nScope: string) {
  const { t } = useScopedI18n(i18nScope);
  const { toDayjs } = useDayjs();

  /**
   * Validates a field value using the backend API.
   * @param instanceId - The unique identifier of the module instance.
   * @param fieldName - The name of the field to validate.
   * @param value - The value to validate.
   * @returns `true` if the value is valid, or an error message string if invalid.
   */
  async function validateFromApi(
    instanceId: string,
    fieldName: string,
    value: unknown
  ): Promise<true | string> {
    try {
      await validate(instanceId, fieldName, value);
      return true;
    } catch (error) {
      return hasTranslatedError(error)
        ? (error.response!.data as LinPulsarApiErrorResponseBody).error
        : t('validation.unknownError');
    }
  }

  /**
   * Validates that a field value is present (not null, undefined, or empty).
   * @param value - The value to validate.
   * @returns `true` if the value is present, or an error message string if not.
   */
  function required(value: unknown): true | string {
    if (value === null || value === undefined || value === '') {
      return t('validation.required');
    }
    return true;
  }

  /**
   * Validates that a string field value matches a basic email shape.
   * Local part allows letters, digits and `._%+-`; domain allows
   * letters, digits, `.` and `-`; top-level label is at least two
   * letters. Aligned with the "99% of real addresses" pattern from
   * https://www.regular-expressions.info/email.html — pragmatic, not
   * RFC 5322 compliant.
   * Empty values (`null`, `undefined`, `''`) are skipped and return `true`,
   * so this rule can be combined with `required` without producing duplicate errors.
   * @param value - The value to validate.
   * @returns `true` if the value is empty or matches an email shape,
   *          or an error message string otherwise.
   */
  function email(value: unknown): true | string {
    if (value == null || value === '') {
      return true;
    }
    if (
      typeof value !== 'string' ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    ) {
      return t('validation.email');
    }
    return true;
  }

  /**
   * Validates that a string field value meets the minimum length requirement.
   * @param value - The value to validate.
   * @param minValue - The minimum required length.
   * @returns `true` if the value meets the minimum length, or an error message string if not.
   */
  function minLength(
    value: string | null | undefined,
    minValue: number
  ): true | string {
    if (value != null && value.length < minValue) {
      return t('validation.minLength', { min: minValue });
    }
    return true;
  }

  /**
   * Validates that a string field value does not exceed the maximum length requirement.
   * @param value - The value to validate.
   * @param maxValue - The maximum allowed length.
   * @returns `true` if the value does not exceed the maximum length, or an error message string if it does.
   */
  function maxLength(
    value: string | null | undefined,
    maxValue: number
  ): true | string {
    if (value != null && value.length > maxValue) {
      return t('validation.maxLength', { max: maxValue });
    }
    return true;
  }

  /**
   * Validates that a numeric field value meets the minimum value requirement.
   * @param value - The value to validate.
   * @param minValue - The minimum required value.
   * @returns `true` if the value meets the minimum value, or an error message string if not.
   */
  function min(value: number, minValue: number): true | string {
    if (minValue > value) {
      return t('validation.min', { min: minValue });
    }
    return true;
  }

  /**
   * Validates that a numeric field value does not exceed the maximum value requirement.
   * @param value - The value to validate.
   * @param maxValue - The maximum allowed value.
   * @returns `true` if the value does not exceed the maximum value, or an error message string if it does.
   */
  function max(value: number, maxValue: number): true | string {
    if (value > maxValue) {
      return t('validation.max', { max: maxValue });
    }
    return true;
  }

  /**
   * Validates that a string field value matches a specified pattern.
   * @param value - The value to validate.
   * @param pattern - The regex pattern the value must match.
   * @returns `true` if the value matches the pattern, or an error message string if not.
   */
  function pattern(value: string, pattern: string): true | string {
    if (!new RegExp(pattern).test(value)) {
      return t('validation.pattern', { pattern: pattern.toString() });
    }
    return true;
  }

  /**
   * Validates that a value is unique within a given array of items.
   * - For primitive values (`string`, `number`, `boolean`), comparison uses `String()` conversion, so `1` and `"1"` are considered equal.
   * - For objects and arrays, comparison uses deep equality.
   * Returns `true` if value is `null` or `undefined`.
   * @param value - The value to validate.
   * @param items - The array of items to check against.
   * @returns `true` if the value is unique, or an error message string if not.
   */
  function unique(value: unknown, items: unknown[]): true | string {
    if (value == null) {
      return true;
    }
    const isDuplicate =
      typeof value === 'object'
        ? items.some((item) => deepEqualUnordered(value, item))
        : items.some((item) => item != null && String(item) === String(value));
    if (isDuplicate) {
      return t('validation.unique');
    }
    return true;
  }

  /**
   * Validates that a file, or every file of a multiple selection, does not exceed a maximum size, expressed in
   * megabytes.
   * Empty values (`null`, `undefined`, `[]`) are skipped and return `true`, so this rule can be combined with
   * `required` without producing duplicate errors.
   * @param value - The file to validate, or the files of a multiple selection.
   * @param maxSize - The maximum allowed size, in megabytes.
   * @returns `true` if the value is empty or every file is within the limit, or an error message string if a file
   *          exceeds it.
   */
  function maxFileSize(
    value: File | File[] | null | undefined,
    maxSize: number
  ): true | string {
    const exceeds = toFiles(value).some(
      (file) => file.size > maxSize * 1024 * 1024
    );

    if (exceeds) {
      return t('validation.maxFileSize', { maxFileSize: maxSize });
    }

    return true;
  }

  /**
   * Validates that the extension of a file name, or of every file name of a multiple selection, is one of the
   * allowed extensions. Extensions are compared case-insensitively and without their leading dot; a name without
   * extension is rejected.
   * Empty values (`null`, `undefined`, `[]`) and an empty list are skipped and return `true`.
   * @param value - The file to validate, or the files of a multiple selection.
   * @param extensions - The allowed extensions, with or without leading dot (e.g. `['png', '.jpg']`).
   * @returns `true` if the value is empty, the list is empty or every extension is allowed, or an error message
   *          string otherwise.
   */
  function allowedExtensions(
    value: File | File[] | null | undefined,
    extensions: string[]
  ): true | string {
    if (extensions.length === 0) {
      return true;
    }

    const allowed = extensions.map((extension) =>
      extension.toLowerCase().replace(/^\./, '')
    );
    const rejected = toFiles(value).some(
      (file) => !allowed.includes(extensionOf(file.name))
    );

    if (rejected) {
      return t('validation.allowedExtensions', {
        extensions: allowed.join(', '),
      });
    }

    return true;
  }

  /**
   * Validates that a value is a valid date.
   * - Strings are validated against `format` with strict parsing, so they must match it exactly.
   * - Non-string values (`number`, `Date`, `Dayjs`) are accepted as long as dayjs can parse them; `format` is ignored.
   * - Empty values (`null`, `undefined`, `''`) are skipped and return `true`, so this rule can be combined with `required` without producing duplicate errors.
   * @param value - The value to validate.
   * @param format - The date format string (e.g. `'YYYY-MM-DD'`). Optional; falls back to `'YYYY-MM-DD'` when omitted or empty. Only applied to string values.
   * @returns `true` if the value is empty or parses to a valid date, or an error message string if not.
   */
  function validDate(value: unknown, format?: string): true | string {
    if (value == null || value === '') {
      return true;
    }

    if (!toDayjs(value, format).isValid()) {
      return t('validation.invalidDate', {
        format: format || DEFAULT_DATE_FORMAT,
      });
    }

    return true;
  }

  /**
   * Validates that a date value is strictly after another date.
   * Comparison is performed at **day granularity** in the **local timezone**.
   * For string values this is timezone-neutral (no offset is applied); for non-string values (`Date`, timestamp, `Dayjs`), the local-timezone calendar day is used.
   * @param value - The value to validate.
   * @param compareTo - The date to compare to. Parsing rules are the same as for `value`.
   * @param format - The date format string (e.g. `'YYYY-MM-DD'`). Optional; falls back to `'YYYY-MM-DD'` when omitted or empty. Only applied to string values.
   * @returns `true` if the date is strictly after `compareTo`, empty, or unparseable; an error message string if it is the same or before `compareTo`.
   */
  function afterDate(
    value: unknown,
    compareTo: unknown,
    format?: string
  ): true | string {
    if (value == null || value === '') {
      return true;
    }

    const valueDate = toDayjs(value, format);
    const compareToDate = toDayjs(compareTo, format);

    if (!valueDate.isValid() || !compareToDate.isValid()) {
      return true;
    }

    if (!valueDate.isAfter(compareToDate, 'day')) {
      return t('validation.afterDate', {
        compareTo: compareToDate.format(format || DEFAULT_DATE_FORMAT),
      });
    }
    return true;
  }

  /**
   * Validates that a date value is strictly before another date.
   * Comparison is performed at **day granularity** in the **local timezone**.
   * For string values this is timezone-neutral (no offset is applied); for non-string values (`Date`, timestamp, `Dayjs`), the local-timezone calendar day is used.
   * @param value - The value to validate.
   * @param compareTo - The date to compare to. Parsing rules are the same as for `value`.
   * @param format - The date format string (e.g. `'YYYY-MM-DD'`). Optional; falls back to `'YYYY-MM-DD'` when omitted or empty. Only applied to string values.
   * @returns `true` if the date is strictly before `compareTo`, empty, or unparseable; an error message string if it is the same or after `compareTo`.
   */
  function beforeDate(
    value: unknown,
    compareTo: unknown,
    format?: string
  ): true | string {
    if (value == null || value === '') {
      return true;
    }

    const valueDate = toDayjs(value, format);
    const compareToDate = toDayjs(compareTo, format);

    if (!valueDate.isValid() || !compareToDate.isValid()) {
      return true;
    }

    if (!valueDate.isBefore(compareToDate, 'day')) {
      return t('validation.beforeDate', {
        compareTo: compareToDate.format(format || DEFAULT_DATE_FORMAT),
      });
    }
    return true;
  }

  /**
   * Validates that a date value is on or after another date (inclusive lower bound).
   * Comparison is performed at **day granularity** in the **local timezone**.
   * For string values this is timezone-neutral (no offset is applied); for non-string values (`Date`, timestamp, `Dayjs`), the local-timezone calendar day is used.
   * @param value - The value to validate.
   * @param compareTo - The date to compare to. Parsing rules are the same as for `value`.
   * @param format - The date format string (e.g. `'YYYY-MM-DD'`). Optional; falls back to `'YYYY-MM-DD'` when omitted or empty. Only applied to string values.
   * @returns `true` if the date is the same or after `compareTo`, empty, or unparseable; an error message string if it is strictly before `compareTo`.
   */
  function fromDate(
    value: unknown,
    compareTo: unknown,
    format?: string
  ): true | string {
    if (value == null || value === '') {
      return true;
    }

    const valueDate = toDayjs(value, format);
    const compareToDate = toDayjs(compareTo, format);

    if (!valueDate.isValid() || !compareToDate.isValid()) {
      return true;
    }

    if (valueDate.isBefore(compareToDate, 'day')) {
      return t('validation.fromDate', {
        compareTo: compareToDate.format(format || DEFAULT_DATE_FORMAT),
      });
    }
    return true;
  }

  /**
   * Validates that a date value is on or before another date (inclusive upper bound).
   * Comparison is performed at **day granularity** in the **local timezone**.
   * For string values this is timezone-neutral (no offset is applied); for non-string values (`Date`, timestamp, `Dayjs`), the local-timezone calendar day is used.
   * @param value - The value to validate.
   * @param compareTo - The date to compare to. Parsing rules are the same as for `value`.
   * @param format - The date format string (e.g. `'YYYY-MM-DD'`). Optional; falls back to `'YYYY-MM-DD'` when omitted or empty. Only applied to string values.
   * @returns `true` if the date is the same or before `compareTo`, empty, or unparseable; an error message string if it is strictly after `compareTo`.
   */
  function upToDate(
    value: unknown,
    compareTo: unknown,
    format?: string
  ): true | string {
    if (value == null || value === '') {
      return true;
    }

    const valueDate = toDayjs(value, format);
    const compareToDate = toDayjs(compareTo, format);

    if (!valueDate.isValid() || !compareToDate.isValid()) {
      return true;
    }

    if (valueDate.isAfter(compareToDate, 'day')) {
      return t('validation.upToDate', {
        compareTo: compareToDate.format(format || DEFAULT_DATE_FORMAT),
      });
    }
    return true;
  }

  return {
    validateFromApi,
    required,
    email,
    minLength,
    maxLength,
    min,
    max,
    pattern,
    unique,
    maxFileSize,
    allowedExtensions,
    validDate,
    afterDate,
    beforeDate,
    fromDate,
    upToDate,
  };
}
