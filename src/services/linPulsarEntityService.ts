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

import type { Page, Pagination, QueryFilter } from '../types/page';
import { getHttpClient } from './httpClientService';
import { getModuleHostConfiguration } from './linPulsarModuleConfigurationService';
import { getNunjucksEnv } from './nunjucksService';

/**
 * Encodes the strings of a context as URI components, so that a rendered value stays a single path segment. Arrays and
 * objects are encoded recursively.
 * @param value - The value to encode.
 * @returns The encoded value.
 */
function encodeContext(value: unknown): unknown {
  if (typeof value === 'string') {
    return encodeURIComponent(value);
  }
  if (Array.isArray(value)) {
    return value.map(encodeContext);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, encodeContext(item)])
    );
  }
  return value;
}

/**
 * Resolves the API endpoint of a module instance, by rendering its `apiEndpoint` as a Nunjucks template with the given
 * context, so that a module can target a nested resource, such as `"api/structures/{{ params.structureId }}/hierarchies"`.
 * The values of the context are URI-encoded. A plain endpoint is rendered as is.
 * @param instanceId - The unique identifier of the module instance.
 * @param context - The context used to render the endpoint.
 * @returns The resolved API endpoint.
 */
function resolveApiEndpoint(
  instanceId: string,
  context: Record<string, unknown>
): string {
  const { apiEndpoint } = getModuleHostConfiguration(instanceId);

  return getNunjucksEnv()
    .renderString(
      apiEndpoint,
      encodeContext(context) as Record<string, unknown>
    )
    .trim();
}

/**
 * Saves a new entity to the backend.
 * @template T - Type of the entity being saved.
 * @template Y - Type of the response returned by the server.
 * @param instanceId - The unique identifier of the module instance.
 * @param record - The entity data to be saved.
 * @param context - The context used to render a templated `apiEndpoint`.
 * @returns A promise that resolves with the saved entity data returned by the server.
 */
export async function saveEntity<T, Y>(
  instanceId: string,
  record: T,
  context: Record<string, unknown> = {}
): Promise<Y> {
  const apiEndpoint = resolveApiEndpoint(instanceId, context);

  return getHttpClient()
    .post<Y>(`/${apiEndpoint}`, record)
    .then(({ data }) => data);
}

/**
 * Updates an existing entity in the backend.
 * @template T - Type of the entity being updated.
 * @template Y - Type of the response returned by the server.
 * @param instanceId - The unique identifier of the module instance.
 * @param entityId - The identifier of the entity to update, URI-encoded in the path.
 * @param record - The updated entity data.
 * @param context - The context used to render a templated `apiEndpoint`.
 * @returns A promise that resolves with the updated entity data returned by the server.
 */
export async function updateEntity<T, Y>(
  instanceId: string,
  entityId: string,
  record: T,
  context: Record<string, unknown> = {}
): Promise<Y> {
  const apiEndpoint = resolveApiEndpoint(instanceId, context);

  return getHttpClient()
    .put<Y>(`/${apiEndpoint}/${encodeURIComponent(entityId)}`, record)
    .then(({ data }) => data);
}

/**
 * Retrieves a paginated list of entities from the backend.
 * @template T - Type of the entities being retrieved.
 * @param instanceId - The unique identifier of the module instance.
 * @param filters - Filters to apply when querying entities.
 * @param pagination - Pagination settings for the query.
 * @param context - The context used to render a templated `apiEndpoint`.
 * @returns A promise that resolves with a paginated page of entities.
 */
export async function getEntities<T>(
  instanceId: string,
  filters: QueryFilter,
  pagination: Pagination,
  context: Record<string, unknown> = {}
): Promise<Page<T>> {
  const apiEndpoint = resolveApiEndpoint(instanceId, context);

  return getHttpClient()
    .get<Page<T>>(`/${apiEndpoint}`, {
      params: { ...filters, ...pagination },
    })
    .then(({ data }) => data);
}

/**
 * Retrieves a single entity by its ID from the backend.
 * @template T - Type of the entity being retrieved.
 * @param instanceId - The unique identifier of the module instance.
 * @param entityId - The identifier of the entity to retrieve, URI-encoded in the path.
 * @param context - The context used to render a templated `apiEndpoint`.
 * @returns A promise that resolves with the entity data.
 */
export async function getEntityById<T>(
  instanceId: string,
  entityId: string,
  context: Record<string, unknown> = {}
): Promise<T> {
  const apiEndpoint = resolveApiEndpoint(instanceId, context);

  return getHttpClient()
    .get<T>(`/${apiEndpoint}/${encodeURIComponent(entityId)}`)
    .then(({ data }) => data);
}

/**
 * Delete a single entity by its ID from the backend.
 * @param instanceId - The unique identifier of the module instance.
 * @param entityId - The identifier of the entity to delete, URI-encoded in the path.
 * @param context - The context used to render a templated `apiEndpoint`.
 * @returns An empty promise.
 */
export async function deleteEntityById(
  instanceId: string,
  entityId: string,
  context: Record<string, unknown> = {}
): Promise<void> {
  const apiEndpoint = resolveApiEndpoint(instanceId, context);

  return getHttpClient().delete(
    `/${apiEndpoint}/${encodeURIComponent(entityId)}`
  );
}

/**
 * Validates a specific field of an entity.
 * @param instanceId - The unique identifier of the module instance.
 * @param fieldName - The name of the field to validate.
 * @param fieldValue - The value of the field to validate.
 * @param context - The context used to render a templated `apiEndpoint`.
 * @returns An empty promise if the field is valid; otherwise, it throws an error.
 */
export async function validate(
  instanceId: string,
  fieldName: string,
  fieldValue: unknown,
  context: Record<string, unknown> = {}
): Promise<void> {
  const apiEndpoint = resolveApiEndpoint(instanceId, context);

  await getHttpClient().post<void>(
    `/${apiEndpoint}/validate/${fieldName}`,
    fieldValue,
    { headers: { 'Content-Type': 'application/json' } }
  );
}
