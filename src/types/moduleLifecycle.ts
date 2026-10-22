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

import type { ModuleHostConfig } from './module';

/**
 * Module lifecycle phases enumeration.
 *
 * Defines the sequence of initialization steps for remote modules.
 * Each phase is executed in order for all modules before moving to the next phase.
 */
export enum ModuleLifecyclePhase {
  /**
   * Initial setup phase - module is being loaded.
   *
   * Use this phase to validate dependencies and prepare the module.
   */
  SETUP = 'setup',

  /**
   * Configuration phase - module receives configuration.
   *
   * Use this phase to receive and validate the host configuration.
   */
  CONFIGURE = 'configure',

  /**
   * Initialization phase - module initializes its core features.
   *
   * Use this phase to register stores and initialize resources.
   */
  INITIALIZE = 'initialize',

  /**
   * Ready phase - module is ready to be used.
   *
   * Use this phase to perform final checks and emit ready state.
   */
  READY = 'ready',

  /**
   * Post-initialization phase - final setup after all modules are ready.
   *
   * Use this phase for cross-module integrations and final setup.
   */
  POST_INIT = 'postInit',
}

/**
 * Result of a lifecycle phase execution.
 *
 * Modules should return this from their lifecycle hooks to indicate
 * success or failure of the phase.
 */
export interface ModuleLifecycleResult {
  /**
   * Whether the phase completed successfully.
   *
   * If false, the module still continues through the remaining phases:
   * the host does not use the result.
   */
  success: boolean;

  /**
   * Error message if the phase failed.
   *
   * Only present when success is false.
   */
  error?: string;

  /**
   * Additional metadata from the phase.
   *
   * Use this to provide debugging information or statistics.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Module lifecycle hooks interface.
 *
 * Remote modules should implement these hooks to participate in the lifecycle.
 * All hooks are optional - implement only what your module needs.
 * @template T Type of the module-specific options.
 */
export interface ModuleLifecycleHooks<T> {
  /**
   * Called when the module is first loaded.
   *
   * Use this to prepare the module for initialization and validate
   * that all required dependencies are available.
   * @returns Promise resolving to the lifecycle result.
   */
  setup(): Promise<ModuleLifecycleResult>;

  /**
   * Called to configure the module with application-specific settings.
   *
   * Use this to receive and validate the host configuration for your module.
   * This is where you should check that all required configuration is present.
   * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  configure(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;

  /**
   * Called to initialize the module's core functionality.
   *
   * Use this to initialize any resources
   * your module needs to function.
   * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  initialize(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;

  /**
   * Called when the module is ready to be used.
   *
   * Use this to perform final checks and emit ready state.
   * At this point, all other modules have completed initialization.
   * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  ready(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;

  /**
   * Called after all modules have been initialized.
   *
   * Use this for cross-module integrations and final setup that requires
   * all modules to be ready.
   * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  postInit(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
}
