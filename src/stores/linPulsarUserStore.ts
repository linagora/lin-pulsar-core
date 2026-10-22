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

import type { IdTokenClaims } from 'oidc-client-ts';
import { defineStore } from 'pinia';
import { getPiniaStore } from '../services/piniaStoreService';
import type { LinPulsarUser } from '../types/linPulsarUser';

/**
 * State interface for the LinPulsar User Store.
 */
interface LinPulsarUserState {
  /** The current user information. */
  user: LinPulsarUser;
  /** Flag indicating whether the user is authenticated. */
  isAuthenticated: boolean;
}

/**
 * Returns the LinPulsar User Store instance.
 * @returns The LinPulsar User Store instance.
 */
export const useLinPulsarUserStore = () =>
  _useLinPulsarUserStore(getPiniaStore());

/**
 * Pinia store to manage user authentication state and information.
 */
const _useLinPulsarUserStore = defineStore('LinPulsarUserStore', {
  /**
   * State properties of the user store.
   * @returns The initial state of the user store.
   */
  state: (): LinPulsarUserState => ({
    user: { username: '', email: '', fullName: '', roles: [] },
    isAuthenticated: false,
  }),

  actions: {
    /**
     * Populates the store from the claims of an OIDC ID token.
     * Maps `sub` → username, `email`, `name` → fullName, `roles` → roles,
     * and flips `isAuthenticated` to true.
     * @param claims The decoded ID token claims provided by oidc-client-ts.
     */
    setUserFromClaims(claims: IdTokenClaims) {
      const rawRoles = claims.roles;
      this.user = {
        username: claims.sub,
        email: typeof claims.email === 'string' ? claims.email : '',
        fullName: typeof claims.name === 'string' ? claims.name : '',
        roles: Array.isArray(rawRoles)
          ? rawRoles.filter((role) => typeof role === 'string')
          : [],
      };
      this.isAuthenticated = true;
    },
  },
});
