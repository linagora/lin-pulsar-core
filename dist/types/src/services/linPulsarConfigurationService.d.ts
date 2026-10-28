import type { LinPulsarApiEndpointConfiguration, LinPulsarEntityConfiguration } from '../types/linPulsarConfiguration';
/**
 * Service for managing and exposing LinPulsar entity and route configurations.
 * Fetches metadata from the backend API.
 */
/**
 * Fetches all entity configurations from the backend.
 * @returns A promise resolving to an array of entity configurations.
 */
export declare function getEntitiesConfiguration(): Promise<LinPulsarEntityConfiguration[]>;
/**
 * Fetches a specific entity configuration by name.
 * @param entityId - The name/identifier of the entity.
 * @returns A promise resolving to the entity configuration.
 */
export declare function getEntityConfiguration(entityId: string): Promise<LinPulsarEntityConfiguration>;
/**
 * Fetches all api endpoint configurations from the backend.
 * @returns A promise resolving to an array of api endpoint configurations.
 */
export declare function getApiEndpointsConfiguration(): Promise<LinPulsarApiEndpointConfiguration[]>;
