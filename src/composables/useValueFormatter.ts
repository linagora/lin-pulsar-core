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

import type { ValueFormatter } from '../types/formatter';
import { useCommonMapper } from './useCommonMapper';

/**
 * Builds the formatter registry. Rebuilt on every composable call because formatters close over helpers that need a
 * Vue setup context.
 * @param mapper - Value mapping helpers the formatters delegate to.
 * @returns The formatters, keyed by name.
 */
function createFormatters(
  mapper: ReturnType<typeof useCommonMapper>
): Record<string, ValueFormatter> {
  return {
    /**
     * Formats a date using the i18n format named by `options.formatKey`.
     * @param value - The raw date value.
     * @param options - Must carry a `formatKey` string.
     * @returns The formatted date, or the raw value when `formatKey` is missing or is not a string.
     */
    toDate: (value, options) => {
      if (!options?.formatKey || typeof options.formatKey !== 'string') {
        return value;
      }

      return mapper.toDate(value, options.formatKey);
    },
  };
}

/**
 * Composable applying named formatters to raw values before display.
 * @returns The value formatting helpers.
 */
export function useValueFormatter() {
  const formatters = createFormatters(useCommonMapper());

  /**
   * Formats a value with the named formatter. Never throws: anything it cannot handle is returned untouched.
   * @param value - The raw value to format.
   * @param formatter - Name of the formatter to apply. Unknown names return the raw value.
   * @param options - Options forwarded to the formatter. `toDate` requires a `formatKey` string.
   * @returns The formatted value, or the original value when it cannot be formatted.
   */
  function formatValue(
    value: unknown,
    formatter?: string,
    options?: Record<string, unknown>
  ): unknown {
    if (value == null || !formatter || !Object.hasOwn(formatters, formatter)) {
      return value;
    }

    return formatters[formatter](value, options);
  }

  return { formatValue };
}
