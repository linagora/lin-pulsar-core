import type { ModuleHostConfig, RemoteModule } from '../types/module';
import type { ModuleLifecycleResult } from '../types/moduleLifecycle';
/**
 * Basic implementation of a remote module lifecycle.
 *
 * This class provides default implementations for all lifecycle hooks,
 * allowing business modules to extend it and override only the hooks they need.
 *
 * All lifecycle hooks are optional and return success by default.
 * @template T Type of the module-specific options provided in the host configuration.
 */
export declare class BasicRemoteModule<T> implements RemoteModule<T> {
    /**
     * Unique identifier for the module.
     *
     * Must match the ID in the host configuration.
     */
    readonly id: string;
    /**
     * Human-readable name of the module.
     */
    readonly name: string;
    /**
     * Version of the module (semantic versioning).
     */
    readonly version: string;
    /**
     * Optional description of what the module does.
     */
    readonly description?: string;
    /**
     * Creates a new remote module instance.
     * @param id - Unique module identifier.
     * @param name - Human-readable module name.
     * @param version - Module version (semver).
     * @param description - Optional module description.
     */
    constructor(id: string, name: string, version: string, description?: string);
    /**
     * Setup phase - validate dependencies and prepare the module.
     *
     * This is called first, before any other lifecycle phase.
     * Use it to check if all required dependencies are available.
     *
     * Default implementation returns success.
     * Override this method to add custom setup logic.
     * @returns Promise resolving to the lifecycle result.
     */
    setup(): Promise<ModuleLifecycleResult>;
    /**
     * Configure phase - receive and validate host configuration.
     *
     * This is called after setup, before initialization.
     * Use it to receive and validate the configuration from the host.
     *
     * Default implementation returns success.
     * Override this method to add custom configuration logic.
     * @param config - Module-specific configuration from host.
     *                 Contains module-specific options of type T.
     * @returns Promise resolving to the lifecycle result.
     */
    configure(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
    /**
     * Initialize phase - register stores and initialize resources.
     *
     * This is called after configuration.
     * Use it to initialize module resources.
     *
     * Default implementation returns success.
     * Override this method to add custom initialization logic.
     * @param config - Module-specific configuration from host.
     *                 Contains module-specific options of type T.
     * @returns Promise resolving to the lifecycle result.
     */
    initialize(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
    /**
     * Ready phase - signal that the module is ready for use.
     *
     * This is called after all modules are initialized.
     * Use it to perform final checks and emit ready state.
     *
     * Default implementation returns success.
     * Override this method to add custom ready logic.
     * @param config - Module-specific configuration from host.
     *                 Contains module-specific options of type T.
     * @returns Promise resolving to the lifecycle result.
     */
    ready(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
    /**
     * Post-initialization phase - cross-module integrations.
     *
     * This is called after all modules are ready.
     * Use it for cross-module integrations and final setup.
     *
     * Default implementation returns success.
     * Override this method to add custom post-init logic.
     * @param config - Module-specific configuration from host.
     *                 Contains module-specific options of type T.
     * @returns Promise resolving to the lifecycle result.
     */
    postInit(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
}
