/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinOpenFactory software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinOpenFactory™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinOpenFactory™, powered by
 * Linagora © 2009–2026. Contribute to LinOpenFactory R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinOpenFactory user interface, (ii) retain all hypertext links between LinOpenFactory
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinOpenFactory along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinOpenFactory software.
 */

import dayjs from 'dayjs';
import { useCommonMapper } from 'src/composables/useCommonMapper';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useI18n } from 'vue-i18n';

vi.mock('vue-i18n', () => ({
  useI18n: vi.fn(),
}));

describe('Test mapper: useCommonMapper', () => {
  const tMock = vi.fn();

  beforeEach(() => {
    tMock.mockReset();
    useI18n.mockReturnValue({ t: tMock });
  });

  describe('Test function: toDate', () => {
    it('should return "" for falsy values (null/undefined/empty)', () => {
      tMock.mockReturnValue('YYYY-MM-DD HH:mm');
      const { toDate } = useCommonMapper();

      expect(toDate(null, 'application.dateFormat')).toBe('');
      expect(toDate(undefined, 'application.dateFormat')).toBe('');
      expect(toDate('', 'application.dateFormat')).toBe('');
    });

    it('should return "" for an invalid date string', () => {
      tMock.mockReturnValue('YYYY-MM-DD HH:mm');
      const { toDate } = useCommonMapper();

      expect(toDate('not-a-valid-date', 'application.dateFormat')).toBe('');
    });

    it('should format a valid ISO date string', () => {
      tMock.mockReturnValue('YYYY-MM-DD');
      const { toDate } = useCommonMapper();

      const iso = '2024-07-20T12:34:56.000Z';
      const result = toDate(iso, 'application.dateFormat');

      expect(result).toBe(dayjs(iso).format('YYYY-MM-DD'));
      expect(tMock).toHaveBeenCalledWith('application.dateFormat');
    });

    it('should format a high-precision datetime string using the locale format', () => {
      tMock.mockReturnValue('DD/MM/YYYY');
      const { toDate } = useCommonMapper();

      expect(
        toDate('2024-06-30T12:34:56.789003', 'application.dateFormat')
      ).toBe('30/06/2024');
    });
  });

  describe('Test function: toDateISO', () => {
    it('should return "" for falsy values (null/undefined/empty)', () => {
      const { toDateISO } = useCommonMapper();

      expect(toDateISO(null)).toBe('');
      expect(toDateISO(undefined)).toBe('');
      expect(toDateISO('')).toBe('');
    });

    it('should return "" for an invalid date string', () => {
      const { toDateISO } = useCommonMapper();

      expect(toDateISO('not-a-valid-date')).toBe('');
    });

    it('should validate ISO inputs and return them as-is when valid', () => {
      tMock.mockReturnValue('DD/MM/YYYY');
      const { toDateISO } = useCommonMapper();

      expect(toDateISO('2024-06-30T00:00:00.000Z')).toBe(
        '2024-06-30T00:00:00.000Z'
      );
      expect(toDateISO('2024-06-30T00:00:00Z')).toBe('2024-06-30T00:00:00Z');
      expect(toDateISO('2024-06-30T12:00:00+02:00')).toBe(
        '2024-06-30T12:00:00+02:00'
      );
      expect(toDateISO('2024-06-30')).toBe('');
      expect(toDateISO('2024-06-30T12:00:00')).toBe('');
    });

    it('should return "" for a structurally valid but semantically invalid ISO date', () => {
      const { toDateISO } = useCommonMapper();

      expect(toDateISO('2024-99-99T99:99:99Z')).toBe('');
    });

    it('should convert a locale-formatted date string to ISO format', () => {
      tMock.mockReturnValue('DD/MM/YYYY');
      const { toDateISO } = useCommonMapper();

      const input = '24/07/2025';
      const result = toDateISO(input);

      expect(result).toBe('2025-07-24T00:00:00.000Z');
    });
  });

  describe('Test function: toEmptyRecord', () => {
    it('should return a record with every declared field set to an empty string', () => {
      const { toEmptyRecord } = useCommonMapper();
      const fields = [
        { name: 'externalId', type: 'text', rules: ['required'] },
        { name: 'email', type: 'email', rules: ['required', 'email'] },
      ];

      expect(toEmptyRecord(fields)).toEqual({
        externalId: '',
        email: '',
      });
    });

    it('should return an empty object for an empty field list', () => {
      const { toEmptyRecord } = useCommonMapper();

      expect(toEmptyRecord([])).toEqual({});
    });

    it('should return a new object on each call', () => {
      const { toEmptyRecord } = useCommonMapper();
      const fields = [{ name: 'foo', type: 'text', rules: [] }];

      expect(toEmptyRecord(fields)).not.toBe(toEmptyRecord(fields));
    });
  });

  describe('Test function: formatDate', () => {
    it('should format a date using dayjs default parsing when no inputFormat is given', () => {
      const { formatDate } = useCommonMapper();

      const result = formatDate('2024-07-20T12:34:56.000Z', 'YYYY-MM-DD');

      expect(result).toBe('2024-07-20');
    });

    it('should return "" for falsy values (null/undefined/empty)', () => {
      const { formatDate } = useCommonMapper();

      expect(formatDate(null, 'YYYY-MM-DD')).toBe('');
      expect(formatDate(undefined, 'YYYY-MM-DD')).toBe('');
      expect(formatDate('', 'YYYY-MM-DD')).toBe('');
    });

    it.each([
      ['30/06/2024', '2024-06-30'],
      ['not-a-valid-date', ''],
      ['31/02/2024', ''],
      ['2024-07-20T12:34:56.000Z', ''],
    ])('should handle inputFormat parsing for %s', (value, expected) => {
      const outputFormat = 'YYYY-MM-DD';
      const inputFormat = 'DD/MM/YYYY';
      const { formatDate } = useCommonMapper();

      const result = formatDate(value, outputFormat, inputFormat);

      expect(result).toBe(expected);
    });

    it('should format a Date instance using dayjs default parsing when no inputFormat is given', () => {
      const { formatDate } = useCommonMapper();

      // The 6 is July because it begin at 0 not one (0 is january)
      const result = formatDate(new Date(Date.UTC(2024, 6, 20)), 'YYYY-MM-DD');

      expect(result).toBe('2024-07-20');
    });
  });

  describe('Test function: toDayJs', () => {
    it('should parse an ISO 8601 string into a Dayjs object', () => {
      const { toDayJs } = useCommonMapper();

      const result = toDayJs('2025-07-24T12:34:56.000Z');

      expect(result?.isValid()).toBe(true);
      expect(result?.toISOString()).toBe('2025-07-24T12:34:56.000Z');
    });

    it('should return null for falsy values (null/undefined/empty)', () => {
      const { toDayJs } = useCommonMapper();

      expect(toDayJs(null)).toBeNull();
      expect(toDayJs(undefined)).toBeNull();
      expect(toDayJs('')).toBeNull();
    });

    it('should return null for an invalid date string', () => {
      const { toDayJs } = useCommonMapper();

      expect(toDayJs('not-a-valid-date')).toBeNull();
    });
  });
});
