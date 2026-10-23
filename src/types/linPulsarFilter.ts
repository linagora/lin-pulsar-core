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

/**
 * Separator used between value expressions combined with OR in a filter's string representation.
 */
export const LIN_PULSAR_FILTER_OR_SEPARATOR = '|';

/**
 * Prefix used to mark a filter value as negated.
 */
export const LIN_PULSAR_FILTER_NEGATION_PREFIX = 'not_';

/**
 * Supported filter categories. Defines the filter behavior and the UI input used to edit it.
 */
export type LinPulsarFilterType = 'date' | 'text' | 'number' | 'list' | 'tree';

/**
 * Supported comparison operators for a filter value.
 * - `lk_` matches a "like / contains" comparison.
 * - `` (empty string) matches a strict equality comparison.
 * - `gt_` matches a "greater than" comparison.
 * - `lt_` matches a "lower than" comparison.
 */
export type LinPulsarFilterOperator = 'lk_' | '' | 'gt_' | 'lt_';

/**
 * Configuration used to dynamically resolve the item associated with each value of a
 * `LinPulsarFilter`, for filters whose values are identifiers (e.g. UUIDs) and need additional
 * information to be rendered in a human-readable way.
 *
 * It only describes *how* to retrieve the items: performing the requests is the responsibility of
 * the consuming layer (such as the component displaying the filter values), never of `LinPulsarFilter`
 * or `LinPulsarFilterValue`.
 */
export interface LinPulsarFilterDynamicLabelOptions {
  /**
   * Whether to perform one request per filter value.
   *
   * Defaults to false, meaning that a single request is made for all values.
   */
  multipleRequests?: boolean;

  /**
   * URL template used to retrieve items.
   *
   * `{{value}}` is available when multipleRequests is true.
   * `{{values}}` is available when multipleRequests is false.
   */
  url: string;

  /**
   * Path to the collection containing the returned items.
   *
   * Only used when multipleRequests is false.
   */
  responseItemsPath?: string;

  /**
   * Path to the value attribute within each returned item.
   *
   * Only used when multipleRequests is false.
   */
  valuePath?: string;
}

/**
 * Represents a user preference entry for a saved filter set in LinPulsar.
 *
 * This object stores the minimal metadata required to identify and reconstruct
 * a filter set from persisted user preferences, including its unique identifier,
 * display label, and serialized filter value.
 */
export interface LinPulsarFilterSetUserPreference {
  /**
   * Unique identifier of the saved filter set.
   * Typically used as a stable key for persistence and retrieval.
   */
  id: string;

  /**
   * Human-readable label for the filter set.
   * Used for display purposes in the UI (e.g., dropdowns, saved views list).
   */
  label: string;

  /**
   * Serialized representation of the filter configuration.
   */
  value: string;
}
