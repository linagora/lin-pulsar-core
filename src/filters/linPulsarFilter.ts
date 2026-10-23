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

import {
  LIN_PULSAR_FILTER_OR_SEPARATOR,
  type LinPulsarFilterDynamicLabelOptions,
  type LinPulsarFilterType,
} from '../types/linPulsarFilter';
import { LinPulsarFilterValue } from './linPulsarFilterValue';

/**
 * Represents a filter that can be applied to a list of entities.
 * The generic parameter `T` allows consumers to define their own options structure
 * for maximum flexibility.
 * @template T - The type of options, defaults to Record<string, unknown>.
 */
export class LinPulsarFilter<T = Record<string, unknown>> {
  /**
   *  Auto generated unique identifier of the filter.
   */
  id: string;

  /**
   * Identifier of the filter.
   */
  name: string;

  /**
   * Defines the filter category and expected behavior.
   */
  type: LinPulsarFilterType;

  /**
   * Configuration object of the filter, defined by the consumer.
   */
  options: T;

  /**
   * List of applied filter values.
   */
  values: LinPulsarFilterValue[];

  /**
   * Configuration used to resolve the `item` of each value whose label can't be rendered from the
   * raw value alone, such as an identifier. Performing the requests it describes is up to the
   * consuming layer: this class only carries the configuration.
   */
  dynamicLabelOptions?: LinPulsarFilterDynamicLabelOptions;

  /**
   * Create a new filter.
   * @param name - Identifier of the filter.
   * @param type - Defines the filter category and expected behavior.
   * @param options - Configuration object of the filter, defined by the consumer.
   * @param values - List of applied filter values.
   * @param dynamicLabelOptions - Configuration used to resolve the item of each value.
   */
  constructor(
    name: string,
    type: LinPulsarFilterType,
    options: T,
    values: LinPulsarFilterValue[],
    dynamicLabelOptions?: LinPulsarFilterDynamicLabelOptions
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.type = type;
    this.options = options;
    this.values = values;
    this.dynamicLabelOptions = dynamicLabelOptions;
  }

  /**
   * Parses a value expression (e.g. `paris|not_lk_lyon`, as produced by
   * {@link LinPulsarFilterValue.toString}) into a new {@link LinPulsarFilter} instance — `input` is the
   * bare value expression only, never the `name=` query parameter prefix produced by
   * {@link LinPulsarFilter.toString}.
   *
   * `type`, `options` and `dynamicLabelOptions` aren't derivable from `input`: pass the filter
   * `definition` declared in the configuration to carry them over, so that a filter restored from
   * a URL or from a saved filter set behaves like the one the user applied — without it, dynamic
   * labels can't be resolved and the values are rendered raw. When no `definition` is given, the
   * result falls back to a placeholder `'text'` `type`, empty `options` and no
   * `dynamicLabelOptions`. `name` is the query parameter key and always wins over
   * `definition.name`; `id` is auto generated as for any instance.
   *
   * A non-string `input` at runtime (this class is exported across Module Federation boundaries,
   * where TypeScript cannot enforce the contract) is treated like an empty string: an empty
   * `values` array, rather than throwing.
   * @param name - Identifier of the filter.
   * @param input - The value expression, with values separated by `|`.
   * @param definition - Filter definition to restore `type`, `options` and `dynamicLabelOptions` from.
   * @returns The parsed filter instance.
   * @template T - The type of options, defaults to Record<string, unknown>.
   */
  static fromString<T = Record<string, unknown>>(
    name: string,
    input: string,
    definition?: LinPulsarFilter<T>
  ): LinPulsarFilter<T> {
    const values =
      typeof input !== 'string' || input === ''
        ? []
        : input
            .split(LIN_PULSAR_FILTER_OR_SEPARATOR)
            .map((part) => LinPulsarFilterValue.fromString(part));

    return new LinPulsarFilter<T>(
      name,
      definition?.type ?? 'text',
      definition?.options ?? ({} as T),
      values,
      definition?.dynamicLabelOptions
    );
  }

  /**
   * Reconstructs the filter as an HTTP query parameter value, ready to use with
   * APIs powered by `spring-query-filter`. Items resolved through `dynamicLabelOptions` are
   * display information only and never appear in the result.
   * @returns The query parameter string representation of the filter, e.g. `paris|not_lk_lyon`.
   */
  toString(): string {
    return this.values
      .map((value) => value.toString())
      .join(LIN_PULSAR_FILTER_OR_SEPARATOR);
  }
}
