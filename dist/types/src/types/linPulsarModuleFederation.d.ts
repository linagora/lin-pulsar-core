import type { Router } from 'vue-router';
import type { LocalComponent, ModuleHostConfig, RemoteModule } from './module';
import type { ModuleLifecyclePhase, ModuleLifecycleResult } from './moduleLifecycle';
/**
 * Declaration of a Module Federation remote to register.
 */
export interface LinPulsarRemoteConfig {
    /**
     * Unique name of the remote (e.g. `linPulsar`).
     */
    name: string;
    /**
     * URL of the remote manifest (e.g. `http://localhost:5001/mf-manifest.json`).
     */
    entry: string;
}
/**
 * Host-side runner of a single lifecycle phase for one federated module.
 * @param module - The remote module lifecycle implementation.
 * @param config - The host configuration associated with this module instance.
 * @param router - The host application router.
 * @returns A promise resolving to the module's result for the phase.
 */
export type LinPulsarModuleFederationPhaseRunner = (module: RemoteModule<unknown>, config: ModuleHostConfig<unknown>, router: Router) => Promise<ModuleLifecycleResult>;
/**
 * Options for initializing the federated module lifecycle from a host application.
 */
export interface LinPulsarModuleFederationInitOptions {
    /**
     * Host application router, used to register the routes exposed by the federated modules.
     */
    router: Router;
    /**
     * Module Federation remotes to register before loading any module.
     */
    remotes: LinPulsarRemoteConfig[];
    /**
     * URLs of the module configuration files to load (e.g. `/modules/AccountsPage.json`).
     */
    modules: string[];
    /**
     * URLs of additional zone definition files to load (e.g. `/zones/supersetGraphs.json`).
     *
     * Each file holds a JSON array of `ModuleZoneDefinition` entries, registered after the zones declared by the
     * modules.
     */
    extraZones?: string[];
    /**
     * Host-local components to make available to zones and module configurations, indexed by name.
     *
     * Besides Vue components, any module element referenced from a module configuration (lifecycle implementation,
     * route definitions, i18n messages) can be registered here.
     */
    localComponents?: Record<string, LocalComponent>;
    /**
     * Optional host-side hooks on the phase runners.
     *
     * A hook is executed after the default host-side behavior of its phase.
     */
    hooks?: Partial<Record<ModuleLifecyclePhase, LinPulsarModuleFederationPhaseRunner>>;
}
