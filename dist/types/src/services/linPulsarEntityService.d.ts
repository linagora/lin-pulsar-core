import type { Page, Pagination, QueryFilter } from '../types/page';
/**
 * Saves a new entity to the backend.
 * @template T - Type of the entity being saved.
 * @template Y - Type of the response returned by the server.
 * @param instanceId - The unique identifier of the module instance.
 * @param record - The entity data to be saved.
 * @returns A promise that resolves with the saved entity data returned by the server.
 */
export declare function saveEntity<T, Y>(instanceId: string, record: T): Promise<Y>;
/**
 * Updates an existing entity in the backend.
 * @template T - Type of the entity being updated.
 * @template Y - Type of the response returned by the server.
 * @param instanceId - The unique identifier of the module instance.
 * @param entityId - The identifier of the entity to update.
 * @param record - The updated entity data.
 * @returns A promise that resolves with the updated entity data returned by the server.
 */
export declare function updateEntity<T, Y>(instanceId: string, entityId: string, record: T): Promise<Y>;
/**
 * Retrieves a paginated list of entities from the backend.
 * @template T - Type of the entities being retrieved.
 * @param instanceId - The unique identifier of the module instance.
 * @param filters - Filters to apply when querying entities.
 * @param pagination - Pagination settings for the query.
 * @returns A promise that resolves with a paginated page of entities.
 */
export declare function getEntities<T>(instanceId: string, filters: QueryFilter, pagination: Pagination): Promise<Page<T>>;
/**
 * Retrieves a single entity by its ID from the backend.
 * @template T - Type of the entity being retrieved.
 * @param instanceId - The unique identifier of the module instance.
 * @param entityId - The identifier of the entity to retrieve.
 * @returns A promise that resolves with the entity data.
 */
export declare function getEntityById<T>(instanceId: string, entityId: string): Promise<T>;
/**
 * Delete a single entity by its ID from the backend.
 * @param instanceId - The unique identifier of the module instance.
 * @param entityId - The identifier of the entity to delete.
 * @returns An empty promise.
 */
export declare function deleteEntityById(instanceId: string, entityId: string): Promise<void>;
/**
 * Validates a specific field of an entity.
 * @param instanceId - The unique identifier of the module instance.
 * @param fieldName - The name of the field to validate.
 * @param fieldValue - The value of the field to validate.
 * @returns An empty promise if the field is valid; otherwise, it throws an error.
 */
export declare function validate(instanceId: string, fieldName: string, fieldValue: unknown): Promise<void>;
