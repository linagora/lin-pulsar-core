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

import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { getUiDesign } from '../services/uiDesignService';
import type {
  LinPulsarHtmlAttrs,
  LinPulsarQComponentProps,
  LinPulsarDraggableProps,
  QComponentName,
  ThirdPartyComponentName,
  UiDesign,
  UiDesignNamespace,
  UiDesignValue,
} from '../types/uiDesign';
import {
  HTML_ATTRS,
  Q_COMPONENT_PROPS,
  THIRD_PARTY_COMPONENT_PROPS,
} from '../types/uiDesign';

const ALL_COMPONENT_PROPS = {
  ...Q_COMPONENT_PROPS,
  ...THIRD_PARTY_COMPONENT_PROPS,
} as const;

/**
 * Retrieves a nested value from an object using dot-separated keys.
 * @param obj - The object to traverse.
 * @param path - The path string, e.g., 'namespace.key.subkey'.
 * @returns The value at the given path, or undefined if not found.
 */
/**
 * Represents a UI design value or a namespace of design values.
 */
type UiDesignResult = UiDesignValue | UiDesignNamespace;

/**
 * Retrieves a nested value from an object using dot-separated keys.
 * @param obj - The object to traverse.
 * @param path - The path string, e.g., 'namespace.key.subkey'.
 * @returns The value at the given path, or undefined if not found.
 */
function getNested(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  path: string
): UiDesignResult | undefined {
  return path.split('.').reduce<UiDesignResult | undefined>((acc, key) => {
    if (acc && typeof acc === 'object') {
      return (
        acc as Record<string, UiDesignValue | UiDesignNamespace | undefined>
      )[key];
    }

    return undefined;
  }, obj);
}

/**
 * Retrieve a UI configuration value from a namespace with fallback to `default`.
 * Always returns a UiDesignValue. Throws if the value is not found or is a nested object.
 * @param config - The UI design configuration object.
 * @param namespace - The namespace to look for (can be nested using dot notation).
 * @param type - The key within the namespace (can be nested using dot notation).
 * @returns The primitive configuration value.
 */
function getUiDesignValue(
  config: UiDesign,
  namespace: string,
  type: string
): UiDesignValue {
  let value = getNested(config, `${namespace}.${type}`);

  // fallback to default
  if (value === undefined) {
    value = getNested(config, `default.${type}`);
  }

  // ensure we only return a primitive
  if (typeof value === 'object') {
    throw new Error(
      `[UiDesign] Value for '${namespace}.${type}' is a nested object or null, expected a primitive.`
    );
  }

  return value as UiDesignValue;
}

/**
 * Retrieve the list of prop keys for a given component.
 * @param component - The component name.
 * @returns An array of prop keys for the component.
 */
function getComponentProps<T>(
  component: QComponentName | ThirdPartyComponentName
): Array<keyof (T & LinPulsarHtmlAttrs)> {
  if (!(component in ALL_COMPONENT_PROPS)) {
    throw new Error(
      `[UiDesign] The component '${component}' is not supported for UI design retrieval.`
    );
  }

  return [...ALL_COMPONENT_PROPS[component], ...HTML_ATTRS] as Array<
    keyof (T & LinPulsarHtmlAttrs)
  >;
}

/**
 * Composable providing access to the shared UI design configuration.
 *
 * Allows retrieving UI configuration values for a given namespace and key,
 * with automatic fallback to the `default` namespace if the value is not defined.
 * @returns An object containing the `ui` function.
 */
export function useUiDesign() {
  const cfg: ComputedRef<UiDesign> = computed(() => getUiDesign());

  /**
   * Retrieve typed props for a component from a UI namespace, along with the `class` and `style`
   * HTML attributes every component accepts.
   * @template T - The component name type.
   * @param uiNamespace - The UI namespace to fetch properties from.
   * @param component - The component name (e.g., 'q-btn', 'q-input').
   * @param overrideProps - Optional partial props to override the retrieved values.
   * @returns An object containing the component props and HTML attributes with correct types.
   */
  function ui<T extends LinPulsarQComponentProps | LinPulsarDraggableProps>(
    uiNamespace: string,
    component: QComponentName | ThirdPartyComponentName,
    overrideProps?: Partial<T & LinPulsarHtmlAttrs>
  ): T & LinPulsarHtmlAttrs {
    const keys = getComponentProps<T>(component);
    const result = {} as T & LinPulsarHtmlAttrs;

    for (const key of keys) {
      const value =
        overrideProps?.[key] ??
        getUiDesignValue(cfg.value, uiNamespace, `${component}.${String(key)}`);
      if (value !== undefined) {
        result[key] = value as (T & LinPulsarHtmlAttrs)[typeof key];
      }
    }

    return result;
  }

  return { ui };
}
