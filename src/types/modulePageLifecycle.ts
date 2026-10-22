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

import type { ModuleLifecycleHooks } from './moduleLifecycle';

/**
 * Host-provided options understood by the default page module lifecycle.
 *
 * Module-specific option types should extend this interface so the default
 * lifecycle behavior can read the shared options from the host configuration.
 */
export interface ModulePageLifecycleHostOptions {
  /**
   * Whether the module registers an entry in the host application's main
   * navigation menu during the post-initialization phase.
   */
  addNavigationMenu?: boolean;
}

/**
 * Creation options for the page module lifecycle factory.
 * @template T Type of the module-specific options provided in the host configuration.
 */
export interface ModulePageLifecycleOptions<
  T extends ModulePageLifecycleHostOptions = ModulePageLifecycleHostOptions,
> {
  /**
   * Unique identifier for the module.
   *
   * Must match the ID in the host configuration.
   */
  id: string;

  /**
   * Human-readable name of the module.
   */
  name: string;

  /**
   * Version of the module (semantic versioning).
   */
  version: string;

  /**
   * Optional description of what the module does.
   */
  description?: string;

  /**
   * Zone component names registered once in the host application layout's
   * dialog zone during the post-initialization phase
   * (e.g. `myRemote/ConfirmationDialog`).
   */
  dialogComponents?: string[];

  /**
   * Zone of the host application layout where the dialog components are
   * registered (e.g. `base-layout.dialogComponent`).
   */
  dialogZone: string;

  /**
   * Optional per-phase lifecycle overrides.
   *
   * An overridden phase fully replaces the default behavior of that phase.
   */
  hooks?: Partial<ModuleLifecycleHooks<T>>;
}
