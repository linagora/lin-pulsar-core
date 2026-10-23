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

import { QDATE_DEFAULT_MASK } from '../constants/quasarDate';
import { useFieldValidation } from './useFieldValidation';

/**
 * Composable for field validation compatible with Quasar framework.
 * @param i18nScope The i18n scope for translation keys used in validation messages.
 * @returns An object containing validation methods formatted for Quasar.
 */
export function useQuasarFieldValidation(i18nScope: string) {
  const {
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
  } = useFieldValidation(i18nScope);

  return {
    validateFromApi:
      (instanceId: string, fieldName: string) =>
      (value: string): Promise<true | string> =>
        validateFromApi(instanceId, fieldName, value),
    required,
    email,
    min: (minValue: number) => (value: string | number) =>
      min(typeof value === 'string' ? parseFloat(value) : value, minValue),
    max: (maxValue: number) => (value: string | number) =>
      max(typeof value === 'string' ? parseFloat(value) : value, maxValue),
    minLength: (minValue: number) => (value: string) =>
      minLength(value, minValue),
    maxLength: (maxValue: number) => (value: string) =>
      maxLength(value, maxValue),
    pattern: (patternValue: string) => (value: string) =>
      pattern(value, patternValue),
    unique: (items: unknown[]) => (value: unknown) => unique(value, items),
    maxFileSize:
      (maxSize: number) => (value: File | File[] | null | undefined) =>
        maxFileSize(value, maxSize),
    allowedExtensions:
      (extensions: string[]) => (value: File | File[] | null | undefined) =>
        allowedExtensions(value, extensions),
    validDate: (format?: string) => (value: unknown) =>
      validDate(value, format || QDATE_DEFAULT_MASK),
    afterDate: (compareTo: string, format?: string) => (value: unknown) =>
      afterDate(value, compareTo, format || QDATE_DEFAULT_MASK),
    beforeDate: (compareTo: string, format?: string) => (value: unknown) =>
      beforeDate(value, compareTo, format || QDATE_DEFAULT_MASK),
    fromDate: (compareTo: string, format?: string) => (value: unknown) =>
      fromDate(value, compareTo, format || QDATE_DEFAULT_MASK),
    upToDate: (compareTo: string, format?: string) => (value: unknown) =>
      upToDate(value, compareTo, format || QDATE_DEFAULT_MASK),
  };
}
