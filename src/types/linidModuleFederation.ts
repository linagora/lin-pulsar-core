/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinID Identity Manager software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinID™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinID™, powered by
 * Linagora © 2009–2013. Contribute to LinID R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinID Identity Manager user interface, (ii) retain all hypertext links between LinID Identity Manager
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinID Identity Manager along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinID Identity Manager software.
 */

import type { Router } from 'vue-router';
import type { LocalComponent, ModuleHostConfig, RemoteModule } from './module';
import type {
  ModuleLifecyclePhase,
  ModuleLifecycleResult,
} from './moduleLifecycle';

/**
 * Declaration of a Module Federation remote to register.
 */
export interface LinidRemoteConfig {
  /**
   * Unique name of the remote (e.g. `catalogUI`).
   */
  name: string;

  /**
   * URL of the remote manifest (e.g. `http://localhost:5001/mf-manifest.json`).
   */
  entry: string;
}

/**
 * Host-side runner of a single lifecycle phase for one federated module.
 * @param module - The remote module lifecycle implementation.
 * @param config - The host configuration associated with this module instance.
 * @param router - The host application router.
 * @returns A promise resolving to the module's result for the phase.
 */
export type LinidModuleFederationPhaseRunner = (
  module: RemoteModule<unknown>,
  config: ModuleHostConfig<unknown>,
  router: Router
) => Promise<ModuleLifecycleResult>;

/**
 * Options for initializing the federated module lifecycle from a host application.
 */
export interface LinidModuleFederationInitOptions {
  /**
   * Host application router, used to register the routes exposed by the federated modules.
   */
  router: Router;

  /**
   * Module Federation remotes to register before loading any module.
   */
  remotes: LinidRemoteConfig[];

  /**
   * URLs of the module configuration files to load (e.g. `/modules/AccountsPage.json`).
   */
  modules: string[];

  /**
   * URLs of additional zone definition files to load (e.g. `/zones/supersetGraphs.json`).
   *
   * Each file holds a JSON array of `ModuleZoneDefinition` entries, registered after the zones declared by the
   * modules.
   */
  extraZones?: string[];

  /**
   * Host-local components to make available to zones and module configurations, indexed by name.
   *
   * Besides Vue components, any module element referenced from a module configuration (lifecycle implementation,
   * route definitions, i18n messages) can be registered here.
   */
  localComponents?: Record<string, LocalComponent>;

  /**
   * Optional host-side hooks on the phase runners.
   *
   * A hook is executed after the default host-side behavior of its phase.
   */
  hooks?: Partial<
    Record<ModuleLifecyclePhase, LinidModuleFederationPhaseRunner>
  >;
}
