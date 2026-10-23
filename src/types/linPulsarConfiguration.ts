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

/**
 * Supported UI input types for attribute rendering.
 * Each type corresponds to a specific form component.
 */
export type AttributeInputType =
  | 'Text'
  | 'Number'
  | 'Boolean'
  | 'Date'
  | 'List'
  | 'DynamicList'
  | 'TextArea'
  | 'Email'
  | 'File'
  | 'Tree';

/**
 * Describes a single attribute of an entity.
 * Corresponds to `AttributeDescription` from the backend API.
 * The generic parameter `T` allows consumers to define their own
 * inputSettings structure for maximum flexibility.
 * @template T - The type of inputSettings, defaults to Record<string, unknown>.
 */
export interface LinPulsarAttributeConfiguration<T = Record<string, unknown>> {
  /**
   * The name of the attribute (e.g., "email").
   * Supports dot notation to target values nested inside sub-objects of the
   * entity (e.g., "extraParameters.login").
   */
  name: string;
  /** The backend type of the attribute (e.g., "string", "integer"). */
  type: string;
  /** Whether the attribute is required. */
  required: boolean;
  /** Whether the attribute has validation rules. */
  hasValidations: boolean;
  /** The UI input type to be used on the front-end. */
  input: AttributeInputType;
  /** Settings for the input, defined by the consumer. */
  inputSettings: T;
}

/**
 * Represents the configuration of an entity declared in the application.
 * Returned by the `/metadata/entities` endpoint.
 */
export interface LinPulsarEntityConfiguration {
  /** The name of the entity (e.g., "user", "group"). */
  name: string;
  /** The list of attributes defined for this entity. */
  attributes: LinPulsarAttributeConfiguration[];
}

/**
 * Represents a REST api endpoint configuration exposed by the application.
 * Returned by the `/metadata/routes` endpoint.
 */
export interface LinPulsarApiEndpointConfiguration {
  /** The HTTP method (e.g., "GET", "POST", "PUT", "DELETE"). */
  method: string;
  /** The full api endpoint path (e.g., "/entities/{entity}"). */
  path: string;
  /** The name of the entity this api endpoint is related to; may be null for generic api endpoints. */
  entity: string | null;
  /** The list of path variable names used in the api endpoint (e.g., ["entity", "id"]). */
  variables: string[];
}
