import type { ModuleHostConfig } from './module';
/**
 * Module lifecycle phases enumeration.
 *
 * Defines the sequence of initialization steps for remote modules.
 * Each phase is executed in order for all modules before moving to the next phase.
 */
export declare enum ModuleLifecyclePhase {
    /**
     * Initial setup phase - module is being loaded.
     *
     * Use this phase to validate dependencies and prepare the module.
     */
    SETUP = "setup",
    /**
     * Configuration phase - module receives configuration.
     *
     * Use this phase to receive and validate the host configuration.
     */
    CONFIGURE = "configure",
    /**
     * Initialization phase - module initializes its core features.
     *
     * Use this phase to register stores and initialize resources.
     */
    INITIALIZE = "initialize",
    /**
     * Ready phase - module is ready to be used.
     *
     * Use this phase to perform final checks and emit ready state.
     */
    READY = "ready",
    /**
     * Post-initialization phase - final setup after all modules are ready.
     *
     * Use this phase for cross-module integrations and final setup.
     */
    POST_INIT = "postInit"
}
/**
 * Result of a lifecycle phase execution.
 *
 * Modules should return this from their lifecycle hooks to indicate
 * success or failure of the phase.
 */
export interface ModuleLifecycleResult {
    /**
     * Whether the phase completed successfully.
     *
     * If false, the module still continues through the remaining phases:
     * the host does not use the result.
     */
    success: boolean;
    /**
     * Error message if the phase failed.
     *
     * Only present when success is false.
     */
    error?: string;
    /**
     * Additional metadata from the phase.
     *
     * Use this to provide debugging information or statistics.
     */
    metadata?: Record<string, unknown>;
}
/**
 * Module lifecycle hooks interface.
 *
 * Remote modules should implement these hooks to participate in the lifecycle.
 * All hooks are optional - implement only what your module needs.
 * @template T Type of the module-specific options.
 */
export interface ModuleLifecycleHooks<T> {
    /**
     * Called when the module is first loaded.
     *
     * Use this to prepare the module for initialization and validate
     * that all required dependencies are available.
     * @returns Promise resolving to the lifecycle result.
     */
    setup(): Promise<ModuleLifecycleResult>;
    /**
     * Called to configure the module with application-specific settings.
     *
     * Use this to receive and validate the host configuration for your module.
     * This is where you should check that all required configuration is present.
     * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
     *                 Contains module-specific options of type T.
     * @returns Promise resolving to the lifecycle result.
     */
    configure(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
    /**
     * Called to initialize the module's core functionality.
     *
     * Use this to initialize any resources
     * your module needs to function.
     * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
     *                 Contains module-specific options of type T.
     * @returns Promise resolving to the lifecycle result.
     */
    initialize(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
    /**
     * Called when the module is ready to be used.
     *
     * Use this to perform final checks and emit ready state.
     * At this point, all other modules have completed initialization.
     * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
     *                 Contains module-specific options of type T.
     * @returns Promise resolving to the lifecycle result.
     */
    ready(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
    /**
     * Called after all modules have been initialized.
     *
     * Use this for cross-module integrations and final setup that requires
     * all modules to be ready.
     * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
     *                 Contains module-specific options of type T.
     * @returns Promise resolving to the lifecycle result.
     */
    postInit(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
}
