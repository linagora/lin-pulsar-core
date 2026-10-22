/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for linOpenFactory software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "linOpenFactory™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of linOpenFactory™, powered by
 * Linagora © 2009–2013. Contribute to linOpenFactory R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
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

import type { ConfigType } from 'dayjs';
import { getDayjsInstance } from '../services/dayjsService';

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * Composable exposing dayjs utility functions.
 * @returns An object containing dayjs helper methods.
 */
export function useDayjs() {
  const dayjs = getDayjsInstance();

  /**
   * Parses an arbitrary value into a Dayjs instance.
   * - Strings are parsed with strict mode against `format`; a value that does not match exactly produces an invalid Dayjs.
   * - Non-string values (`number`, `Date`, `Dayjs`, `null`, `undefined`) are passed to dayjs as-is and `format` is ignored.
   * The returned Dayjs may be invalid; callers must check `.isValid()` before using it.
   * @param value - The value to parse.
   * @param format - The date format used for strict parsing of string values. Optional; falls back to `'YYYY-MM-DD'` when omitted or empty. Ignored for non-string values.
   * @returns A Dayjs instance, possibly invalid.
   */
  function toDayjs(value: unknown, format?: string) {
    return typeof value === 'string'
      ? dayjs(value, format || DEFAULT_DATE_FORMAT, true)
      : dayjs(value as ConfigType);
  }

  /**
   * Returns the latest date among a list of values.
   * - String values are parsed with strict mode against `format` via `toDayjs`.
   * - Non-string values (`number`, `Date`, `Dayjs`) are passed to dayjs as-is; `format` is ignored for them.
   * - Invalid or unparseable values are silently skipped.
   * @param dates - The list of date values to compare.
   * @param format - The date format string used for strict parsing of string values (e.g. `'YYYY-MM-DD'`). Optional; falls back to `'YYYY-MM-DD'` when omitted or empty. Ignored for non-string values.
   * @returns The maximum date as a Dayjs instance, or `null` if the list is empty or contains no valid dates.
   */
  function maxDate(dates: unknown[], format?: string) {
    const parsed = dates
      .map((d) => toDayjs(d, format))
      .filter((d) => d.isValid());

    if (parsed.length === 0) {
      return null;
    }

    return parsed.reduce((max, d) => (d.isAfter(max) ? d : max));
  }

  /**
   * Returns the earliest date among a list of values.
   * - String values are parsed with strict mode against `format` via `toDayjs`.
   * - Non-string values (`number`, `Date`, `Dayjs`) are passed to dayjs as-is; `format` is ignored for them.
   * - Invalid or unparseable values are silently skipped.
   * @param dates - The list of date values to compare.
   * @param format - The date format string used for strict parsing of string values (e.g. `'YYYY-MM-DD'`). Optional; falls back to `'YYYY-MM-DD'` when omitted or empty. Ignored for non-string values.
   * @returns The minimum date as a Dayjs instance, or `null` if the list is empty or contains no valid dates.
   */
  function minDate(dates: unknown[], format?: string) {
    const parsed = dates
      .map((d) => toDayjs(d, format))
      .filter((d) => d.isValid());

    if (parsed.length === 0) {
      return null;
    }

    return parsed.reduce((min, d) => (d.isBefore(min) ? d : min));
  }

  return { maxDate, minDate, toDayjs };
}
