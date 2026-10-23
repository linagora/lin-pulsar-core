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

import { getHttpClient } from '../services/httpClientService';
import { useLinPulsarUserPreferenceStore } from '../stores/linPulsarUserPreferenceStore';

/**
 * Composable to manage user preferences lifecycle and synchronization
 * between backend API and local Pinia store.
 * @returns Composable exposing methods to interact with user preferences and the underlying store.
 */
export function useLinPulsarUserPreference() {
  const userPreferenceStore = useLinPulsarUserPreferenceStore();

  /**
   * Fetches user preferences from the backend and initializes the store.
   * @returns A promise resolved when preferences have been loaded into the store.
   */
  function init(): Promise<void> {
    return getHttpClient()
      .get<Record<string, string>>('user-preferences')
      .then(({ data }) => {
        userPreferenceStore.setUserPreferences(data);
      });
  }

  /**
   * Persists a user preference on the backend and updates the store.
   * @param key Preference key to store.
   * @param value Preference value to store.
   * @returns A promise resolved when the preference has been saved and stored locally.
   */
  function saveUserPreference(key: string, value: string): Promise<void> {
    return getHttpClient()
      .post<{
        /**
         * User Preference key.
         */
        key: string;
        /**
         * User Preference value.
         */
        value: string;
      }>('user-preferences', { key, value })
      .then(({ data }) => {
        userPreferenceStore.setUserPreference(data.key, data.value);
      });
  }

  /**
   * Deletes a user preference both from backend and local store.
   * @param key Preference key to delete.
   * @returns A promise resolved when the preference has been removed.
   */
  function deleteUserPreference(key: string): Promise<void> {
    return getHttpClient()
      .delete<void>(`user-preferences/${key}`)
      .then(() => {
        userPreferenceStore.removeUserPreference(key);
      });
  }

  return {
    init,
    saveUserPreference,
    deleteUserPreference,
    userPreferenceStore,
  };
}
