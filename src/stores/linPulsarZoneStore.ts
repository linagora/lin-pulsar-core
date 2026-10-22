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

import { defineStore } from 'pinia';
import { getPiniaStore } from '../services/piniaStoreService';
import type { LinPulsarZoneEntry } from '../types/linPulsarZone';

/**
 * State interface for the LinPulsar Zone Store.
 */
interface LinPulsarZoneState {
  /** Map of zone names to their registered entries. */
  zones: Record<string, LinPulsarZoneEntry[]>;
}

/**
 * Returns the LinPulsar Zone Store instance.
 * @returns The LinPulsar Zone Store instance.
 */
export const useLinPulsarZoneStore = () =>
  _useLinPulsarZoneStore(getPiniaStore());

/**
 * Pinia store managing LinPulsar zones and their registered entries.
 *
 * Each zone can contain multiple {@link LinPulsarZoneEntry} objects,
 * and this store provides utilities to register them dynamically.
 */
const _useLinPulsarZoneStore = defineStore('LinPulsarZoneStore', {
  state: (): LinPulsarZoneState => ({
    zones: {},
  }),

  getters: {
    /**
     * Returns a function that checks whether a zone has at least one registered entry,
     * meaning its renderer produces content.
     * @param state - The store state.
     * @returns A function accepting a zone name and returning true when the zone holds
     *   at least one entry, false otherwise.
     */
    hasZoneEntries: (state) => (zone: string) =>
      (state.zones[zone]?.length ?? 0) > 0,
  },

  actions: {
    /**
     * Append an entry to a specified zone, creating the zone if needed.
     *
     * Internal helper backing the public `register*` actions.
     * @param zone - The name of the zone.
     * @param entry - The entry to append.
     */
    appendEntry(zone: string, entry: LinPulsarZoneEntry): void {
      if (!this.zones[zone]) {
        this.zones[zone] = [];
      }
      this.zones[zone].push(entry);
    },

    /**
     * Register a federated plugin component in a specified zone.
     * @param zone - The name of the zone.
     * @param plugin - The plugin identifier of the remote component to load.
     * @param props - Optional props passed to the rendered component.
     */
    registerPlugin(
      zone: string,
      plugin: string,
      props?: Record<string, unknown>
    ): void {
      this.appendEntry(zone, { type: 'federated', plugin, props });
    },

    /**
     * Register a federated plugin component only if the plugin
     * is not already registered in the zone.
     * @param zone - The name of the zone.
     * @param plugin - The plugin identifier of the remote component to load.
     * @param props - Optional props passed to the rendered component.
     */
    registerPluginOnce(
      zone: string,
      plugin: string,
      props?: Record<string, unknown>
    ): void {
      const isRegistered = this.zones[zone]?.some(
        (entry) => entry.type === 'federated' && entry.plugin === plugin
      );

      if (!isRegistered) {
        this.registerPlugin(zone, plugin, props);
      }
    },

    /**
     * Register a component by name in a specified zone.
     *
     * The name is resolved at render time, which allows this variant to be
     * declared from a module configuration file.
     * @param zone - The name of the zone.
     * @param component - The name of the component to render.
     * @param props - Optional props passed to the rendered component.
     */
    registerComponent(
      zone: string,
      component: string,
      props?: Record<string, unknown>
    ): void {
      this.appendEntry(zone, { type: 'component', component, props });
    },
  },
});
