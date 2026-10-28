/**
 * Supported UI input types for attribute rendering.
 * Each type corresponds to a specific form component.
 */
export type AttributeInputType = 'Text' | 'Number' | 'Boolean' | 'Date' | 'List' | 'DynamicList' | 'TextArea' | 'Email' | 'File' | 'Tree';
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
    /** The backend type of the attribute (e.g., "String", "Integer"). */
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
