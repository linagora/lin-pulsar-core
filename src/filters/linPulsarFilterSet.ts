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

import { LinPulsarFilter } from './linPulsarFilter';

/**
 * Separator used between `name=value` filter pairs in a filter set's string representation.
 */
const LIN_PULSAR_FILTER_SET_SEPARATOR = '&';

/**
 * Separator between a filter's name and its value expression within a single `name=value` pair.
 */
const LIN_PULSAR_FILTER_SET_PAIR_SEPARATOR = '=';

/**
 * Represents a saved filter set (favorite search), combining a user-defined label with the list
 * of `LinPulsarFilter` it is made of. It converts to and parses from a `&`-separated list of
 * `name=value` query parameter pairs — the same URL filter representation produced by
 * `LinPulsarFilter.toString` — so it can be stored as-is in user preferences and reused directly as
 * a query string against APIs powered by
 * [`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter).
 */
export class LinPulsarFilterSet {
  /**
   * Unique identifier of the filter set.
   */
  id: string;
  /**
   * User-friendly name of the favorite search (e.g. "My Active Projects").
   */
  label: string;

  /**
   * Collection of filters composing the favorite search.
   */
  filters: LinPulsarFilter[];

  /**
   * Creates a new filter set.
   * @param id - Unique identifier of the filter set.
   * @param label - User-friendly name of the favorite search.
   * @param filters - Collection of filters composing the favorite search.
   */
  constructor(id: string, label: string, filters: LinPulsarFilter[]) {
    this.id = id;
    this.label = label;
    this.filters = filters;
  }

  /**
   * Parses a string representation of a filter set, as produced by {@link LinPulsarFilterSet.toString},
   * into a new {@link LinPulsarFilterSet} instance.
   *
   * Each `&`-separated segment containing the `=` separator is parsed as a `name=value` pair via
   * {@link LinPulsarFilter.fromString} (which in turn uses `LinPulsarFilterValue.fromString`); segments
   * without `=` are silently dropped instead of producing a filter with a guessed name.
   *
   * `type`, `options` and `dynamicLabelOptions` aren't derivable from the string: pass the filter
   * `definitions` declared in the configuration and each parsed filter is matched to the one
   * carrying the same `name`, so that a restored favorite resolves its dynamic labels like a
   * freshly applied filter. A parsed filter matching no definition keeps placeholder values.
   *
   * `value` tolerates `null`/`undefined`/any non-string at runtime (e.g. `localStorage.getItem(...)`,
   * or across a Module Federation boundary): like an empty string, it produces an empty `filters`
   * array instead of throwing.
   * @param id - Unique identifier of the filter set.
   * @param label - User-friendly name of the favorite search.
   * @param value - The `&`-separated string of `name=value` pairs, as produced by `toString()`.
   * @param definitions - Filter definitions the parsed filters are matched against, by `name`.
   * @returns The parsed filter set.
   */
  static fromString(
    id: string,
    label: string,
    value: string | null | undefined,
    definitions: LinPulsarFilter[] = []
  ): LinPulsarFilterSet {
    const filters =
      typeof value !== 'string' || value === ''
        ? []
        : value
            .split(LIN_PULSAR_FILTER_SET_SEPARATOR)
            .filter((pair) =>
              pair.includes(LIN_PULSAR_FILTER_SET_PAIR_SEPARATOR)
            )
            .map((pair) => {
              const separatorIndex = pair.indexOf(
                LIN_PULSAR_FILTER_SET_PAIR_SEPARATOR
              );
              const name = pair.slice(0, separatorIndex);
              const input = pair.slice(separatorIndex + 1);

              return LinPulsarFilter.fromString(
                name,
                input,
                definitions.find((definition) => definition.name === name)
              );
            });

    return new LinPulsarFilterSet(id, label, filters);
  }

  /**
   * Reconstructs the filter set as a `&`-separated string of `name=value` pairs, one per filter,
   * ready to use with APIs powered by `spring-query-filter` or to store in user preferences.
   * @returns The string representation of the filter set, e.g.
   * `status=active|pending&createdAt=gt_2026-01-01`.
   */
  toString(): string {
    return this.filters
      .map(
        (filter) =>
          `${filter.name}${LIN_PULSAR_FILTER_SET_PAIR_SEPARATOR}${filter.toString()}`
      )
      .join(LIN_PULSAR_FILTER_SET_SEPARATOR);
  }
}
