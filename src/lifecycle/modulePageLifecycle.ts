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

import { useLinPulsarUiStore } from '../stores/linPulsarUiStore';
import { useLinPulsarZoneStore } from '../stores/linPulsarZoneStore';
import type { ModuleHostConfig } from '../types/module';
import type { ModuleLifecycleResult } from '../types/moduleLifecycle';
import type {
  ModulePageLifecycleHostOptions,
  ModulePageLifecycleOptions,
} from '../types/modulePageLifecycle';
import { BasicRemoteModule } from './skeleton';

/**
 * Remote module implementing the default page integration lifecycle.
 *
 * It extends {@link BasicRemoteModule} to inherit the standard metadata and
 * lifecycle behavior expected by the host application, and only customizes
 * the post-initialization phase.
 * @template T Type of the module-specific options provided in the host configuration.
 */
class ModulePageLifecycle<
  T extends ModulePageLifecycleHostOptions,
> extends BasicRemoteModule<T> {
  /**
   * Zone component names registered in the host layout dialog zone.
   */
  private readonly dialogComponents: string[];

  /**
   * Zone of the host application layout where the dialog components are registered.
   */
  private readonly dialogComponentZone: string;

  /**
   * Creates a new page module lifecycle instance.
   * @param options - The creation options describing the module.
   */
  constructor(options: ModulePageLifecycleOptions<T>) {
    super(options.id, options.name, options.version, options.description);
    this.dialogComponents = options.dialogComponents ?? [];
    this.dialogComponentZone = options.dialogZone;
  }

  /**
   * Performs post-initialization tasks for the page module.
   * After the module has been initialized, this method:
   * - Optionally registers an entry in the host application's main navigation menu.
   * - Registers the configured dialog components in the LinPulsar zone registry,
   * making them available to the host application layout.
   *
   * Navigation menu registration is controlled by the
   * {@link ModulePageLifecycleHostOptions.addNavigationMenu} option. When
   * enabled, the menu item uses the module instance identifier for its id, an
   * i18n key for its label, and the configured base path as its navigation
   * target.
   * @param config - The configuration object provided by the host application.
   * @returns A promise that resolves to the result of the module lifecycle operation.
   */
  override async postInit(
    config: ModuleHostConfig<T>
  ): Promise<ModuleLifecycleResult> {
    if (config.options?.addNavigationMenu) {
      useLinPulsarUiStore().addMainNavigationMenuItems({
        id: config.instanceId,
        labelKey: `${config.instanceId}.NavigationMenu.label`,
        path: config.basePath,
      });
    }

    const linPulsarZoneStore = useLinPulsarZoneStore();
    this.dialogComponents.forEach((component) => {
      linPulsarZoneStore.registerPluginOnce(
        this.dialogComponentZone,
        component
      );
    });

    return { success: true };
  }
}

/**
 * Creates the default lifecycle module for a federated page module.
 *
 * The returned instance should be the default export of the file exposed as
 * the module's lifecycle entry in the federation configuration. The host
 * application loads it during boot and drives all lifecycle phases; nothing
 * else needs to be called by the plugin.
 *
 * Any lifecycle phase can be overridden through the `hooks` option; an
 * overridden phase fully replaces the default behavior of that phase.
 * @template T Type of the module-specific options provided in the host configuration.
 * @param options - The creation options describing the module.
 * @returns The remote module instance to expose to the host application.
 */
export function createModulePageLifecycle<
  T extends ModulePageLifecycleHostOptions = ModulePageLifecycleHostOptions,
>(options: ModulePageLifecycleOptions<T>): BasicRemoteModule<T> {
  return Object.assign(new ModulePageLifecycle<T>(options), options.hooks);
}
