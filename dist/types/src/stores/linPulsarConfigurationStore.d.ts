import type { LinPulsarApiEndpointConfiguration, LinPulsarEntityConfiguration } from '../types/linPulsarConfiguration';
/**
 * State interface for the LinPulsar Configuration Store.
 */
interface LinPulsarConfigurationState {
    /** List of entity configurations fetched from the backend. */
    entities: LinPulsarEntityConfiguration[];
    /** List of api endpoint configurations fetched from the backend. */
    apiEndpoints: LinPulsarApiEndpointConfiguration[];
    /** Indicates if the configuration is currently being loaded. */
    loading: boolean;
    /** Error message if the configuration fetch failed. */
    error: string | null;
}
/**
 * Returns the LinPulsar Configuration Store instance.
 * @returns The LinPulsar Configuration Store instance.
 */
export declare const useLinPulsarConfigurationStore: () => import("pinia").Store<"LinPulsarConfigurationStore", LinPulsarConfigurationState, {
    /**
     * Returns an entity configuration by name.
     * @param state - The store state.
     * @returns A function that takes an entity name and returns the configuration.
     */
    getEntityByName: (state: {
        entities: {
            name: string;
            attributes: {
                name: string;
                type: string;
                required: boolean;
                hasValidations: boolean;
                input: import("..").AttributeInputType;
                inputSettings: Record<string, unknown>;
            }[];
        }[];
        apiEndpoints: {
            method: string;
            path: string;
            entity: string | null;
            variables: string[];
        }[];
        loading: boolean;
        error: string | null;
    } & import("pinia").PiniaCustomStateProperties<LinPulsarConfigurationState>) => (name: string) => LinPulsarEntityConfiguration | undefined;
    /**
     * Returns all api endpoints for a specific entity.
     * @param state - The store state.
     * @returns A function that takes an entity name and returns its api endpoints.
     */
    getApiEndpointsByEntity: (state: {
        entities: {
            name: string;
            attributes: {
                name: string;
                type: string;
                required: boolean;
                hasValidations: boolean;
                input: import("..").AttributeInputType;
                inputSettings: Record<string, unknown>;
            }[];
        }[];
        apiEndpoints: {
            method: string;
            path: string;
            entity: string | null;
            variables: string[];
        }[];
        loading: boolean;
        error: string | null;
    } & import("pinia").PiniaCustomStateProperties<LinPulsarConfigurationState>) => (entityName: string) => LinPulsarApiEndpointConfiguration[];
}, {
    /**
     * Fetches all entity and api endpoint configurations from the backend.
     */
    fetchConfiguration(): Promise<void>;
}>;
export {};
