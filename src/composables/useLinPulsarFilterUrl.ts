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

import type {
  LocationQuery,
  LocationQueryValue,
  RouteLocationNormalizedLoaded,
  Router,
} from 'vue-router';
import { LinPulsarFilter } from '../filters/linPulsarFilter';

/**
 * Composable that synchronizes a list of LinPulsar filters with the query
 * params of the current URL.
 * @param router - Vue router instance, used to update the URL.
 * @param route - Current normalized route, used to read query params.
 * @returns An object exposing `setFiltersInUrl` and `getFiltersFromUrl`.
 */
export function useLinPulsarFilterUrl(
  router: Router,
  route: RouteLocationNormalizedLoaded
) {
  /**
   * Updates the URL query params from a list of filters.
   *
   * Query params whose key is listed in `keeps` are preserved as-is.
   * Other params are rebuilt from the provided filters, with all values
   * stored as arrays, including singletons.
   * @param filters - Filters to serialize and inject into the URL.
   * @param keeps - Keys of existing query params to keep unchanged.
   */
  function setFiltersInUrl(filters: LinPulsarFilter[], keeps: string[]) {
    const query: LocationQuery = Object.fromEntries(
      Object.entries(route.query).filter(([key]) => keeps.includes(key))
    );

    router.replace({
      query: filters.reduce((acc, filter) => {
        const key = filter.name;
        const value = filter.toString();

        if (value === '') {
          return acc;
        }

        if (!acc[key]) {
          acc[key] = [];
        }

        const current = acc[key];

        if (Array.isArray(current)) {
          current.push(value);
        } else {
          acc[key] = [current, value];
        }

        return acc;
      }, query),
    });
  }

  /**
   * Extracts the filters present in the current URL, based on the list of
   * known filters passed as a parameter (used to match query param names
   * to filter definitions).
   *
   * Each rebuilt filter carries the `type`, `options` and `dynamicLabelOptions` of the definition
   * it was matched with, so that a filter restored from the URL behaves like the one the user
   * applied — dynamic labels included.
   *
   * `null` values (query param present without a value) are ignored.
   * @param filters - Reference filters used to identify relevant query params.
   * @returns List of filters rebuilt from the URL.
   */
  function getFiltersFromUrl(filters: LinPulsarFilter[]): LinPulsarFilter[] {
    const extractedFilters: LinPulsarFilter[] = [];

    Object.keys(route.query)
      .map((key) => filters.find(({ name }) => key === name))
      .filter((filter) => !!filter)
      .forEach((filter) => {
        const rawValue = route.query[filter.name];
        const values: LocationQueryValue[] = Array.isArray(rawValue)
          ? rawValue
          : [rawValue];

        values
          .filter((value): value is string => value !== null)
          .forEach((value) => {
            extractedFilters.push(
              LinPulsarFilter.fromString(filter.name, value, filter)
            );
          });
      });

    return extractedFilters;
  }

  return { setFiltersInUrl, getFiltersFromUrl };
}
