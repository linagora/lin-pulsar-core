/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinOpenFactory software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinOpenFactory™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinOpenFactory™, powered by
 * Linagora © 2009–2026. Contribute to LinOpenFactory R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinOpenFactory user interface, (ii) retain all hypertext links between LinOpenFactory
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinOpenFactory along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinOpenFactory software.
 */

import type { Component } from 'vue';
import { markRaw } from 'vue';
import type { LocalComponent } from '../types/module';

/**
 * Components made available to zones and module configurations, indexed by the name used to reference them.
 */
const availableLocalComponents: Record<string, LocalComponent> = {};

/**
 * Makes a component available to zones under the given name.
 *
 * Registering a component is what allows a zone entry to reference it by name,
 * either programmatically or from a module configuration file. Components are
 * stored with `markRaw` to keep them out of the reactivity system, as Vue
 * components must not be reactive.
 *
 * Registering an already known name overrides the previous component.
 * @param name - The name under which the component can be referenced.
 * @param component - The component to make available to zones.
 */
export function registerLocalComponent(
  name: string,
  component: LocalComponent
) {
  availableLocalComponents[name] = markRaw(component);
}

/**
 * Makes several components available to zones at once.
 *
 * Convenience wrapper around {@link registerLocalComponent}, typically used by
 * the host application to declare all its local components in a single call.
 * @param components - The components to make available, indexed by name.
 */
export function registerLocalComponents(
  components: Record<string, LocalComponent>
) {
  Object.entries(components).forEach(([name, component]) =>
    registerLocalComponent(name, component)
  );
}

/**
 * Returns the value registered under the given name, if any.
 *
 * Unlike {@link resolveLocalComponent}, unknown names are not resolved against
 * globally registered components: the caller is expected to treat them as an
 * error.
 * @param name - The name of the registered value to retrieve.
 * @returns The registered value, or `undefined` when unknown.
 */
export function getLocalComponent(name: string): LocalComponent | undefined {
  return availableLocalComponents[name];
}

/**
 * Resolves the component registered under the given name.
 *
 * Unknown names are returned as-is so that Vue still attempts to resolve them
 * against globally registered components, which keeps entries working when a
 * component is made available by the application rather than by this registry.
 * @param name - The name of the component to resolve.
 * @returns The registered component, or the name itself when unknown.
 */
export function resolveLocalComponent(name: string): Component | string {
  const component = getLocalComponent(name) as Component | undefined;

  if (!component) {
    console.warn(
      `[LinPulsar Core] Local component "${name}" is not registered, falling back to global resolution. Registered components: ${Object.keys(availableLocalComponents).join(', ')}.`
    );
    return name;
  }

  return component;
}
