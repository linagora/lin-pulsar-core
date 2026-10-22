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

import type { ModuleHostConfig, RemoteModule } from '../types/module';
import type { ModuleLifecycleResult } from '../types/moduleLifecycle';

/**
 * Basic implementation of a remote module lifecycle.
 *
 * This class provides default implementations for all lifecycle hooks,
 * allowing business modules to extend it and override only the hooks they need.
 *
 * All lifecycle hooks are optional and return success by default.
 * @template T Type of the module-specific options provided in the host configuration.
 */
export class BasicRemoteModule<T> implements RemoteModule<T> {
  /**
   * Unique identifier for the module.
   *
   * Must match the ID in the host configuration.
   */
  public readonly id: string;

  /**
   * Human-readable name of the module.
   */
  public readonly name: string;

  /**
   * Version of the module (semantic versioning).
   */
  public readonly version: string;

  /**
   * Optional description of what the module does.
   */
  public readonly description?: string;

  /**
   * Creates a new remote module instance.
   * @param id - Unique module identifier.
   * @param name - Human-readable module name.
   * @param version - Module version (semver).
   * @param description - Optional module description.
   */
  constructor(id: string, name: string, version: string, description?: string) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.description = description;
  }

  /**
   * Setup phase - validate dependencies and prepare the module.
   *
   * This is called first, before any other lifecycle phase.
   * Use it to check if all required dependencies are available.
   *
   * Default implementation returns success.
   * Override this method to add custom setup logic.
   * @returns Promise resolving to the lifecycle result.
   */
  async setup(): Promise<ModuleLifecycleResult> {
    return { success: true };
  }

  /**
   * Configure phase - receive and validate host configuration.
   *
   * This is called after setup, before initialization.
   * Use it to receive and validate the configuration from the host.
   *
   * Default implementation returns success.
   * Override this method to add custom configuration logic.
   * @param config - Module-specific configuration from host.
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  async configure(
    config: ModuleHostConfig<T> /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<ModuleLifecycleResult> {
    return { success: true };
  }

  /**
   * Initialize phase - register stores and initialize resources.
   *
   * This is called after configuration.
   * Use it to initialize module resources.
   *
   * Default implementation returns success.
   * Override this method to add custom initialization logic.
   * @param config - Module-specific configuration from host.
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  async initialize(
    config: ModuleHostConfig<T> /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<ModuleLifecycleResult> {
    return { success: true };
  }

  /**
   * Ready phase - signal that the module is ready for use.
   *
   * This is called after all modules are initialized.
   * Use it to perform final checks and emit ready state.
   *
   * Default implementation returns success.
   * Override this method to add custom ready logic.
   * @param config - Module-specific configuration from host.
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  async ready(
    config: ModuleHostConfig<T> /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<ModuleLifecycleResult> {
    return { success: true };
  }

  /**
   * Post-initialization phase - cross-module integrations.
   *
   * This is called after all modules are ready.
   * Use it for cross-module integrations and final setup.
   *
   * Default implementation returns success.
   * Override this method to add custom post-init logic.
   * @param config - Module-specific configuration from host.
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  async postInit(
    config: ModuleHostConfig<T> /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<ModuleLifecycleResult> {
    return { success: true };
  }
}
