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

import type { Component } from 'vue';
import type { LinidZoneEntry } from './linidZone';
import type { ModuleLifecycleHooks } from './moduleLifecycle';

/**
 * A value registrable under a local name: a Vue component, or any module element referenced from a module
 * configuration (lifecycle implementation, route definitions, i18n messages).
 */
export type LocalComponent = Component | object;

/**
 * Reference to a module element (lifecycle, routes, i18n messages or component) in a module configuration.
 *
 * A plain string references an element exposed through Module Federation (e.g. `catalogUI/PageLifecycle`), as does a
 * {@link FederatedLinidZoneEntry}. A {@link ComponentLinidZoneEntry} references an element registered locally through
 * the `localComponents` initialization option, without any Module Federation loading. The `props` field of an entry is
 * not used for module element references.
 */
export type ModuleComponentRef = string | LinidZoneEntry;

/**
 * Remote module interface.
 *
 * All remote modules exposed via Module Federation should implement this interface.
 * This is the contract between the host application and remote modules.
 * @template T Type of the module-specific options provided in the host configuration.
 */
export interface RemoteModule<T> extends ModuleLifecycleHooks<T> {
  /**
   * Unique identifier for the module.
   *
   * Should be in kebab-case and match the ID in the module configuration.
   */
  id: string;

  /**
   * Human-readable name of the module.
   */
  name: string;

  /**
   * Version of the module.
   *
   * Should follow semantic versioning (semver).
   */
  version: string;

  /**
   * Optional description of the module.
   *
   * Provide a brief description of what the module does.
   */
  description?: string;
}

/**
 * Module configuration in the host (module-<name>.json).
 *
 * This is what the host provides to each module during the configuration phase.
 * The host reads this from `module-<name>.json` files.
 * @template T Type of the module-specific options.
 */
export interface ModuleHostConfig<T> {
  /**
   * Unique identifier for this instance of the module.
   * Typically used to differentiate multiple instances of the same module within the host.
   */
  instanceId: string;

  /**
   * Module Federation remote name (must match a key in remotes.json).
   *
   * This is the name used to load the remote module via Module Federation.
   */
  remoteName: string;

  /**
   * Reference to the element used to load the lifecycle implementation.
   *
   * The referenced element should implement the module lifecycle hooks
   * contract and is typically loaded during the module initialization phase.
   */
  lifecycleRemote: ModuleComponentRef;

  /**
   * Reference to the element used to load the route definitions.
   *
   * The referenced element should hold the routes contributed by the module so
   * they can be registered by the host application.
   */
  routesRemote: ModuleComponentRef;

  /**
   * Reference to the element used to load internationalization resources.
   *
   * The referenced element should hold the module translations, locale
   * definitions, or i18n registration logic consumed by the host application.
   */
  i18nRemote: ModuleComponentRef;

  /**
   * Name of the entity used in the host configuration.
   * Allows the module to retrieve associated attributes and other information for this entity.
   */
  entity: string;

  /**
   * Base URL for the module's API endpoints.
   * All API requests from the module should be prefixed with this endpoint.
   */
  apiEndpoint: string;

  /**
   * Base path (default route) for the module in the host application.
   * Used to mount the module at a specific route.
   */
  basePath: string;

  /**
   * Definitions of the zones where the module will render exposed elements in other modules.
   *
   * Zones should always be set (empty array [] when no zones).
   */
  zones: ModuleZoneDefinition[];

  /**
   * Module-specific options provided in the host configuration.
   * These options are passed to the module during configuration.
   */
  options: T;
}

/**
 * ESM namespace object returned when loading a remote module through
 * Module Federation (for example via `loadRemote`).
 *
 * In a Vite + native ESM environment, federated modules are not auto-unwrapped:
 * the effective export is exposed on the `default` property of the namespace.
 * @template T Type of the value exported as `default` by the federated module.
 */
export interface FederatedModule<T> {
  /**
   * Default export of the federated module.
   *
   * This commonly represents a concrete runtime value such as a lifecycle
   * instance, service, or class instance, but may also be a function, class,
   * or plain object depending on the remote’s contract.
   */
  default: T;
}

/**
 * Fields shared by all UI zone injection variants.
 * @template T Props type for the injected element.
 */
export interface BaseModuleZoneDefinition<T = Record<string, unknown>> {
  /**
   * Name of the target zone exposed by another module where the element will be rendered.
   */
  zone: string;
  /**
   * Optional props to pass to the exposed element rendered in this zone.
   * The module can define the structure of these props as needed.
   */
  props?: T;
}

/**
 * Definition of a UI zone injection rendering an element exposed through module federation.
 * @template T Props type for the injected element.
 */
export interface FederatedModuleZoneDefinition<
  T = Record<string, unknown>,
> extends BaseModuleZoneDefinition<T> {
  /**
   * Name of the exposed element to render in the zone.
   */
  plugin: string;
  /** Never set on this variant, which is identified by its `plugin` field. */
  component?: never;
}

/**
 * Definition of a UI zone injection rendering a component by name.
 *
 * The name is resolved against the components made available to zones, so no
 * module federation loading is involved.
 * @template T Props type for the injected element.
 */
export interface ComponentModuleZoneDefinition<
  T = Record<string, unknown>,
> extends BaseModuleZoneDefinition<T> {
  /**
   * Name of the component to render in the zone.
   */
  component: string;
  /** Never set on this variant, which is identified by its `component` field. */
  plugin?: never;
}

/**
 * Definition of a UI zone injection.
 *
 * Allows a module to declare that an element should be rendered inside a named
 * zone exposed by another module, optionally with props. The element is either
 * exposed through module federation ({@link FederatedModuleZoneDefinition}) or
 * referenced by component name ({@link ComponentModuleZoneDefinition}); the
 * variant is determined by which of the two fields is set.
 * @template T Props type for the injected element.
 */
export type ModuleZoneDefinition<T = Record<string, unknown>> =
  FederatedModuleZoneDefinition<T> | ComponentModuleZoneDefinition<T>;
