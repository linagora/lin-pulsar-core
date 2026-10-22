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

import type { Page, Pagination, QueryFilter } from '../types/page';
import { getHttpClient } from './httpClientService';
import { getModuleHostConfiguration } from './linPulsarModuleConfigurationService';

/**
 * Saves a new entity to the backend.
 * @template T - Type of the entity being saved.
 * @template Y - Type of the response returned by the server.
 * @param instanceId - The unique identifier of the module instance.
 * @param record - The entity data to be saved.
 * @returns A promise that resolves with the saved entity data returned by the server.
 */
export async function saveEntity<T, Y>(
  instanceId: string,
  record: T
): Promise<Y> {
  const configuration = getModuleHostConfiguration(instanceId);

  return getHttpClient()
    .post<Y>(`/${configuration.apiEndpoint}`, record)
    .then(({ data }) => data);
}

/**
 * Updates an existing entity in the backend.
 * @template T - Type of the entity being updated.
 * @template Y - Type of the response returned by the server.
 * @param instanceId - The unique identifier of the module instance.
 * @param entityId - The identifier of the entity to update.
 * @param record - The updated entity data.
 * @returns A promise that resolves with the updated entity data returned by the server.
 */
export async function updateEntity<T, Y>(
  instanceId: string,
  entityId: string,
  record: T
): Promise<Y> {
  const configuration = getModuleHostConfiguration(instanceId);

  return getHttpClient()
    .put<Y>(`/${configuration.apiEndpoint}/${entityId}`, record)
    .then(({ data }) => data);
}

/**
 * Retrieves a paginated list of entities from the backend.
 * @template T - Type of the entities being retrieved.
 * @param instanceId - The unique identifier of the module instance.
 * @param filters - Filters to apply when querying entities.
 * @param pagination - Pagination settings for the query.
 * @returns A promise that resolves with a paginated page of entities.
 */
export async function getEntities<T>(
  instanceId: string,
  filters: QueryFilter,
  pagination: Pagination
): Promise<Page<T>> {
  const configuration = getModuleHostConfiguration(instanceId);

  return getHttpClient()
    .get<Page<T>>(`/${configuration.apiEndpoint}`, {
      params: { ...filters, ...pagination },
    })
    .then(({ data }) => data);
}

/**
 * Retrieves a single entity by its ID from the backend.
 * @template T - Type of the entity being retrieved.
 * @param instanceId - The unique identifier of the module instance.
 * @param entityId - The identifier of the entity to retrieve.
 * @returns A promise that resolves with the entity data.
 */
export async function getEntityById<T>(
  instanceId: string,
  entityId: string
): Promise<T> {
  const configuration = getModuleHostConfiguration(instanceId);

  return getHttpClient()
    .get<T>(`/${configuration.apiEndpoint}/${entityId}`)
    .then(({ data }) => data);
}

/**
 * Delete a single entity by its ID from the backend.
 * @param instanceId - The unique identifier of the module instance.
 * @param entityId - The identifier of the entity to delete.
 * @returns An empty promise.
 */
export async function deleteEntityById(
  instanceId: string,
  entityId: string
): Promise<void> {
  const configuration = getModuleHostConfiguration(instanceId);

  return getHttpClient().delete(`/${configuration.apiEndpoint}/${entityId}`);
}

/**
 * Validates a specific field of an entity.
 * @param instanceId - The unique identifier of the module instance.
 * @param fieldName - The name of the field to validate.
 * @param fieldValue - The value of the field to validate.
 * @returns An empty promise if the field is valid; otherwise, it throws an error.
 */
export async function validate(
  instanceId: string,
  fieldName: string,
  fieldValue: unknown
): Promise<void> {
  const configuration = getModuleHostConfiguration(instanceId);

  await getHttpClient().post<void>(
    `/${configuration.apiEndpoint}/validate/${fieldName}`,
    fieldValue,
    { headers: { 'Content-Type': 'application/json' } }
  );
}
