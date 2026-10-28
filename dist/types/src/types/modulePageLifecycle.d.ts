import type { ModuleLifecycleHooks } from './moduleLifecycle';
/**
 * Host-provided options understood by the default page module lifecycle.
 *
 * Module-specific option types should extend this interface so the default
 * lifecycle behavior can read the shared options from the host configuration.
 */
export interface ModulePageLifecycleHostOptions {
    /**
     * Whether the module registers an entry in the host application's main
     * navigation menu during the post-initialization phase.
     */
    addNavigationMenu?: boolean;
}
/**
 * Creation options for the page module lifecycle factory.
 * @template T Type of the module-specific options provided in the host configuration.
 */
export interface ModulePageLifecycleOptions<T extends ModulePageLifecycleHostOptions = ModulePageLifecycleHostOptions> {
    /**
     * Unique identifier for the module.
     *
     * Must match the ID in the host configuration.
     */
    id: string;
    /**
     * Human-readable name of the module.
     */
    name: string;
    /**
     * Version of the module (semantic versioning).
     */
    version: string;
    /**
     * Optional description of what the module does.
     */
    description?: string;
    /**
     * Zone component names registered once in the host application layout's
     * dialog zone during the post-initialization phase
     * (e.g. `myRemote/ConfirmationDialog`).
     */
    dialogComponents?: string[];
    /**
     * Zone of the host application layout where the dialog components are
     * registered (e.g. `base-layout.dialogComponent`).
     */
    dialogZone: string;
    /**
     * Optional per-phase lifecycle overrides.
     *
     * An overridden phase fully replaces the default behavior of that phase.
     */
    hooks?: Partial<ModuleLifecycleHooks<T>>;
}
