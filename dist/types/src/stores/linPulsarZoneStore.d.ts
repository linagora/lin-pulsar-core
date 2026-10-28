import type { LinPulsarZoneEntry } from '../types/linPulsarZone';
/**
 * State interface for the LinPulsar Zone Store.
 */
interface LinPulsarZoneState {
    /** Map of zone names to their registered entries. */
    zones: Record<string, LinPulsarZoneEntry[]>;
}
/**
 * Returns the LinPulsar Zone Store instance.
 * @returns The LinPulsar Zone Store instance.
 */
export declare const useLinPulsarZoneStore: () => import("pinia").Store<"LinPulsarZoneStore", LinPulsarZoneState, {
    /**
     * Returns a function that checks whether a zone has at least one registered entry,
     * meaning its renderer produces content.
     * @param state - The store state.
     * @returns A function accepting a zone name and returning true when the zone holds
     *   at least one entry, false otherwise.
     */
    hasZoneEntries: (state: {
        zones: Record<string, LinPulsarZoneEntry[]>;
    } & import("pinia").PiniaCustomStateProperties<LinPulsarZoneState>) => (zone: string) => boolean;
}, {
    /**
     * Append an entry to a specified zone, creating the zone if needed.
     *
     * Internal helper backing the public `register*` actions.
     * @param zone - The name of the zone.
     * @param entry - The entry to append.
     */
    appendEntry(zone: string, entry: LinPulsarZoneEntry): void;
    /**
     * Register a federated plugin component in a specified zone.
     * @param zone - The name of the zone.
     * @param plugin - The plugin identifier of the remote component to load.
     * @param props - Optional props passed to the rendered component.
     */
    registerPlugin(zone: string, plugin: string, props?: Record<string, unknown>): void;
    /**
     * Register a federated plugin component only if the plugin
     * is not already registered in the zone.
     * @param zone - The name of the zone.
     * @param plugin - The plugin identifier of the remote component to load.
     * @param props - Optional props passed to the rendered component.
     */
    registerPluginOnce(zone: string, plugin: string, props?: Record<string, unknown>): void;
    /**
     * Register a component by name in a specified zone.
     *
     * The name is resolved at render time, which allows this variant to be
     * declared from a module configuration file.
     * @param zone - The name of the zone.
     * @param component - The name of the component to render.
     * @param props - Optional props passed to the rendered component.
     */
    registerComponent(zone: string, component: string, props?: Record<string, unknown>): void;
}>;
export {};
