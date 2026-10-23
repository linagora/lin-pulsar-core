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

import { useCommonMapper } from 'src/composables/useCommonMapper';
import { useValueFormatter } from 'src/composables/useValueFormatter';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/composables/useCommonMapper', () => ({
  useCommonMapper: vi.fn(),
}));

describe('Test composable: useValueFormatter', () => {
  const toDateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useCommonMapper.mockReturnValue({ toDate: toDateMock });
  });

  describe('Test function: formatValue', () => {
    it('should return null and undefined as-is', () => {
      const { formatValue } = useValueFormatter();

      expect(
        formatValue(null, 'toDate', { formatKey: 'application.dateFormat' })
      ).toBeNull();
      expect(
        formatValue(undefined, 'toDate', {
          formatKey: 'application.dateFormat',
        })
      ).toBeUndefined();
      expect(toDateMock).not.toHaveBeenCalled();
    });

    it('should return the raw value when no formatter is requested', () => {
      const { formatValue } = useValueFormatter();

      expect(formatValue('raw')).toBe('raw');
      expect(formatValue('raw', undefined, { formatKey: 'a.key' })).toBe('raw');
      expect(formatValue('raw', '')).toBe('raw');
      expect(toDateMock).not.toHaveBeenCalled();
    });

    it('should return the raw value for an unregistered formatter name', () => {
      const { formatValue } = useValueFormatter();

      expect(formatValue('raw', 'unknownFormatter')).toBe('raw');
      expect(toDateMock).not.toHaveBeenCalled();
    });

    it('should not resolve inherited Object.prototype members as formatters', () => {
      const { formatValue } = useValueFormatter();

      expect(formatValue('raw', 'constructor')).toBe('raw');
      expect(formatValue('raw', 'toString')).toBe('raw');
      expect(formatValue('raw', 'hasOwnProperty')).toBe('raw');
      expect(formatValue('raw', '__proto__')).toBe('raw');
    });

    it('should not short-circuit falsy values that are not nullish', () => {
      toDateMock.mockReturnValue('formatted');
      const { formatValue } = useValueFormatter();

      expect(
        formatValue(0, 'toDate', { formatKey: 'application.dateFormat' })
      ).toBe('formatted');
      expect(
        formatValue('', 'toDate', { formatKey: 'application.dateFormat' })
      ).toBe('formatted');
      expect(toDateMock).toHaveBeenCalledTimes(2);
    });

    it('should delegate to the toDate mapper and return its result', () => {
      toDateMock.mockReturnValue('20/07/2024');
      const { formatValue } = useValueFormatter();

      const result = formatValue('2024-07-20T12:34:56.000Z', 'toDate', {
        formatKey: 'application.dateFormat',
      });

      expect(result).toBe('20/07/2024');
      expect(toDateMock).toHaveBeenCalledWith(
        '2024-07-20T12:34:56.000Z',
        'application.dateFormat'
      );
    });

    it('should ignore extra options and forward only the formatKey', () => {
      toDateMock.mockReturnValue('20/07/2024');
      const { formatValue } = useValueFormatter();

      formatValue('2024-07-20T12:34:56.000Z', 'toDate', {
        formatKey: 'application.dateFormat',
        unrelated: 'ignored',
      });

      expect(toDateMock).toHaveBeenCalledWith(
        '2024-07-20T12:34:56.000Z',
        'application.dateFormat'
      );
    });

    it('should return the raw value when options are missing', () => {
      const { formatValue } = useValueFormatter();

      expect(formatValue('2024-07-20', 'toDate')).toBe('2024-07-20');
      expect(formatValue('2024-07-20', 'toDate', {})).toBe('2024-07-20');
      expect(toDateMock).not.toHaveBeenCalled();
    });

    it('should return the raw value when formatKey is empty or not a string', () => {
      const { formatValue } = useValueFormatter();

      expect(formatValue('2024-07-20', 'toDate', { formatKey: '' })).toBe(
        '2024-07-20'
      );
      expect(formatValue('2024-07-20', 'toDate', { formatKey: 42 })).toBe(
        '2024-07-20'
      );
      expect(formatValue('2024-07-20', 'toDate', { formatKey: null })).toBe(
        '2024-07-20'
      );
      expect(toDateMock).not.toHaveBeenCalled();
    });

    it('should propagate an empty string returned by the mapper', () => {
      toDateMock.mockReturnValue('');
      const { formatValue } = useValueFormatter();

      expect(
        formatValue('not-a-date', 'toDate', {
          formatKey: 'application.dateFormat',
        })
      ).toBe('');
    });
  });
});
