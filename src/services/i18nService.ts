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

import { type I18n } from 'vue-i18n';

/**
 * Type alias for the shared LinPulsar i18n instance.
 *
 * This type represents the Vue I18n instance used across all LinPulsar modules.
 * The instance is configured in Composition API mode (`legacy: false`) and
 * exposes the global composer API for translations.
 *
 * Using a dedicated alias prevents consumers from falling back to the default
 * `I18n` generic parameters, which may expose both legacy and composition
 * translation signatures and cause TypeScript overload conflicts.
 */
type LinPulsarI18n = I18n<Record<string, never>, Record<string, never>>;

/**
 * Singleton i18n instance shared across all modules.
 */
let i18nInstance: LinPulsarI18n | null = null;

/**
 * Initializes the shared i18n instance.
 * Should be called once by the host application during boot.
 * @param instance - The i18n instance to use as the shared store.
 */
export function setI18nInstance(instance: LinPulsarI18n): void {
  if (i18nInstance !== null) {
    console.warn(
      '[LinPulsar Core] I18n has already been initialized. Re-initialization is ignored.'
    );
    return;
  }
  i18nInstance = instance;
}

/**
 * Returns the shared i18n instance.
 * Must be called after initialization via `setI18nInstance()`.
 * @returns The shared i18n instance.
 */
export function getI18nInstance(): LinPulsarI18n {
  if (i18nInstance === null) {
    throw new Error(
      '[LinPulsar Core] I18n is not initialized. Call setI18nInstance() first.'
    );
  }
  return i18nInstance;
}
