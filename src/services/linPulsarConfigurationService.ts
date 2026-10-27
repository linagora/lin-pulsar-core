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

import type {
  LinPulsarApiEndpointConfiguration,
  LinPulsarEntityConfiguration,
} from '../types/linPulsarConfiguration';
import { getHttpClient } from './httpClientService';

/**
 * Service for managing and exposing LinPulsar entity and route configurations.
 * Fetches metadata from the backend API.
 */
/**
 * Fetches all entity configurations from the backend.
 * @returns A promise resolving to an array of entity configurations.
 */
export async function getEntitiesConfiguration(): Promise<
  LinPulsarEntityConfiguration[]
> {
  const response =
    await getHttpClient().get<LinPulsarEntityConfiguration[]>(
      '/metadata/entities'
    );
  return response.data;
}

/**
 * Fetches a specific entity configuration by name.
 * @param entityId - The name/identifier of the entity.
 * @returns A promise resolving to the entity configuration.
 */
export async function getEntityConfiguration(
  entityId: string
): Promise<LinPulsarEntityConfiguration> {
  const response = await getHttpClient().get<LinPulsarEntityConfiguration>(
    `/metadata/entities/${entityId}`
  );
  return response.data;
}

/**
 * Fetches all api endpoint configurations from the backend.
 * @returns A promise resolving to an array of api endpoint configurations.
 */
export async function getApiEndpointsConfiguration(): Promise<
  LinPulsarApiEndpointConfiguration[]
> {
  const response =
    await getHttpClient().get<LinPulsarApiEndpointConfiguration[]>(
      '/metadata/routes'
    );
  return response.data;
}
