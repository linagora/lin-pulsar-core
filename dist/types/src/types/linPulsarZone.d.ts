import type { Component } from 'vue';
/**
 * Base model shared by all zone entry variants.
 */
export interface BaseLinPulsarZoneEntry {
    /**
     * Optional props to be passed to the rendered component.
     *
     * The keys are prop names, and the values are Vue components or objects
     * compatible with Vue’s component system.
     */
    props?: Record<string, unknown>;
}
/**
 * Zone entry referencing a component loaded through module federation.
 */
export interface FederatedLinPulsarZoneEntry extends BaseLinPulsarZoneEntry {
    /** Discriminant of the federated variant. */
    type: 'federated';
    /**
     * The unique plugin identifier that registered this entry.
     *
     * Typically corresponds to the plugin name or package name.
     */
    plugin: string;
}
/**
 * Zone entry referencing a component by name.
 *
 * Unlike federated entries, no module federation loading is involved:
 * the name is resolved against the components made available to zones.
 */
export interface ComponentLinPulsarZoneEntry extends BaseLinPulsarZoneEntry {
    /** Discriminant of the component variant. */
    type: 'component';
    /**
     * Name of the component to render.
     *
     * Being a plain string, this variant can be declared from a module
     * configuration file, unlike a direct component reference.
     */
    component: string;
}
/**
 * Represents a single entry registered within a LinPulsar Zone.
 *
 * An entry provides its component either through a federated plugin
 * identifier ({@link FederatedLinPulsarZoneEntry}) or through a component
 * name ({@link ComponentLinPulsarZoneEntry}), and can optionally define
 * props to configure that component.
 */
export type LinPulsarZoneEntry = FederatedLinPulsarZoneEntry | ComponentLinPulsarZoneEntry;
/**
 * A zone entry resolved for rendering by `LinPulsarZoneRenderer`.
 *
 * Whatever the entry variant, the resolved form always carries the
 * component to render.
 */
export interface LinPulsarZoneResolvedEntry {
    /**
     * The component to render.
     *
     * Either the async component loaded from the federated plugin, or the
     * component resolved from the name carried by the entry. Unresolved names
     * are kept as strings so that Vue resolves them globally.
     */
    component: Component | string;
    /**
     * Optional props to be passed to the rendered component.
     */
    props?: Record<string, unknown>;
}
