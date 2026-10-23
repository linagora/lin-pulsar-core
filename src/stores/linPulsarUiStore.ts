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

import { defineStore } from 'pinia';
import { getPiniaStore } from '../services/piniaStoreService';
import type { NavigationMenuItem } from '../types/linPulsarUi';

/**
 * State interface for the LinPulsar UI Store.
 */
interface LinPulsarUiState {
  /** List of main navigation menu items. */
  mainNavigationItems: NavigationMenuItem[];
  /** Internationalization state: active locale and available languages. */
  i18n: {
    /** Currently active locale code (e.g. "fr-FR"). */
    locale: string;
    /** List of available locale codes declared in the configuration. */
    languages: string[];
  };
}

/**
 * Returns the LinPulsar UI Store instance.
 * @returns The LinPulsar UI Store instance.
 */
export const useLinPulsarUiStore = () => _useLinPulsarUiStore(getPiniaStore());

/**
 * Pinia store managing LinPulsar UI metadata.
 *
 * This store holds information that can be used by all layouts and components.
 */
const _useLinPulsarUiStore = defineStore('LinPulsarUiStore', {
  state: (): LinPulsarUiState => ({
    mainNavigationItems: [],
    i18n: {
      locale: '',
      languages: [],
    },
  }),

  actions: {
    /**
     * Add items to the main navigation menu.
     * @param items - The navigation menu items to add.
     */
    addMainNavigationMenuItems(...items: NavigationMenuItem[]): void {
      this.mainNavigationItems.push(...items);
    },

    /**
     * Sets the list of available locale codes.
     * @param languages - The available locale codes (e.g. ["fr-FR", "en-US"]).
     */
    setAvailableLanguages(languages: string[]): void {
      this.i18n.languages = languages;
    },

    /**
     * Sets the active locale code.
     * @param locale - The locale code to activate (e.g. "fr-FR").
     */
    setLocale(locale: string): void {
      this.i18n.locale = locale;
    },
  },
});
