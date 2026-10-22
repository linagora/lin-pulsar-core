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

import {
  LIN_PULSAR_FILTER_NEGATION_PREFIX,
  type LinPulsarFilterOperator,
} from '../types/linPulsarFilter';

/**
 * Ordered list of recognized operator prefixes, longest/most specific first.
 * The empty string operator is intentionally excluded since it matches everything.
 */
const LIN_PULSAR_FILTER_OPERATORS: ReadonlyArray<
  Exclude<LinPulsarFilterOperator, ''>
> = ['lk_', 'gt_', 'lt_'];

/**
 * Represents a single applied value of a `LinPulsarFilter`, converted to a string expression
 * combining an optional negation, a comparison operator and a raw value
 * (e.g. `not_lk_paris`, `gt_18`, `paris`).
 */
export class LinPulsarFilterValue {
  /**
   * Whether the comparison must be negated.
   */
  isNegation: boolean;

  /**
   * The comparison operator applied to the value.
   */
  operator: LinPulsarFilterOperator;

  /**
   * The raw filter value, with the negation marker and operator prefix stripped.
   */
  value: string;

  /**
   * Item resolved from the dynamic label request, as configured by
   * `LinPulsarFilter.dynamicLabelOptions`. Display information only: it is never part of the value
   * expression produced by {@link LinPulsarFilterValue.toString}.
   */
  item?: Record<string, unknown>;

  /**
   * Creates a new filter value.
   * @param isNegation - Whether the comparison must be negated.
   * @param operator - The comparison operator applied to the value.
   * @param value - The raw filter value.
   * @param item - Item resolved from the dynamic label request.
   */
  constructor(
    isNegation: boolean,
    operator: LinPulsarFilterOperator,
    value: string,
    item?: Record<string, unknown>
  ) {
    this.isNegation = isNegation;
    this.operator = operator;
    this.value = value;
    this.item = item;
  }

  /**
   * Parses a filter value expression (e.g. `not_lk_paris`) into a {@link LinPulsarFilterValue}.
   *
   * If `input` is not actually a string at runtime (this class is exported across Module
   * Federation boundaries, where TypeScript cannot enforce the contract), the negation marker and
   * operator prefix can't be looked up, so this returns the same neutral result as for an empty
   * string: no negation, no operator, empty value.
   * @param input - The filter value expression to parse.
   * @returns The parsed filter value.
   */
  static fromString(input: string): LinPulsarFilterValue {
    if (typeof input !== 'string' || input === '') {
      return new LinPulsarFilterValue(false, '', '');
    }

    let remaining = input;
    let isNegation = false;

    if (remaining.startsWith(LIN_PULSAR_FILTER_NEGATION_PREFIX)) {
      isNegation = true;
      remaining = remaining.slice(LIN_PULSAR_FILTER_NEGATION_PREFIX.length);
    }

    const operator =
      LIN_PULSAR_FILTER_OPERATORS.find((prefix) =>
        remaining.startsWith(prefix)
      ) ?? '';

    return new LinPulsarFilterValue(
      isNegation,
      operator,
      remaining.slice(operator.length)
    );
  }

  /**
   * Reconstructs the filter value expression from its negation, operator and value. `item` is
   * display information only and is never serialized.
   * @returns The filter value expression (e.g. `not_lk_paris`).
   */
  toString(): string {
    return `${this.isNegation ? LIN_PULSAR_FILTER_NEGATION_PREFIX : ''}${this.operator}${this.value}`;
  }
}
