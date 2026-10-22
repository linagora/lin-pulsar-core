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

import type { ModuleHostConfig } from '../types/module';

/**
 * Stores the configuration of all registered module hosts.
 * Keyed by `instanceId` of each module.
 */
const moduleHostConfigurations = new Map<string, ModuleHostConfig<unknown>>();

/**
 * Registers a module host configuration in the global store.
 * If a configuration with the same `instanceId` already exists, it will be overwritten.
 * @param hostConfig - The configuration object of the module host to register.
 */
export function registerModuleHostConfiguration(
  hostConfig: ModuleHostConfig<unknown>
) {
  moduleHostConfigurations.set(hostConfig.instanceId, hostConfig);
}

/**
 * Retrieves a module host configuration by its `instanceId`.
 * @param instanceId - The unique identifier of the module host.
 * @template T Type of the module-specific options.
 * @throws {Error} If no module host configuration is found for the given instanceId.
 * @returns The `ModuleHostConfig` associated with the given `instanceId`.
 */
export function getModuleHostConfiguration<T>(
  instanceId: string
): ModuleHostConfig<T> {
  const configuration = moduleHostConfigurations.get(instanceId);

  if (!configuration) {
    throw new Error(
      `[LinPulsar Core] No module host configuration found for instanceId: ${instanceId}`
    );
  }

  return configuration as ModuleHostConfig<T>;
}
