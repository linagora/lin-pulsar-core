import type { LinPulsarModuleFederationInitOptions } from '../types/linPulsarModuleFederation';
/**
 * Initializes Module Federation and all federated modules declared by the host application.
 *
 * This function performs the complete federation setup so the host has nothing else to do:
 *
 * 1. Registers the given remotes and shares the Module Federation instance with lin-pulsar-core.
 * 2. Makes the given host-local components available to zones.
 * 3. Loads the given module configuration files and extra zone files.
 * 4. Dynamically loads each remote module's lifecycle entry point.
 * 5. Executes all lifecycle phases sequentially for each module, ensuring deterministic and ordered initialization.
 * 6. Registers the zones of the extra zone files, after the zones declared by the modules.
 *
 * Any phase can be extended through the `hooks` option; a hook is executed after the default host-side behavior of
 * its phase.
 * @param options - The initialization options, including the host application router, remotes, modules and extra
 *   zone files.
 * @returns Resolves once all modules have completed every lifecycle phase.
 */
declare function init(options: LinPulsarModuleFederationInitOptions): Promise<void>;
/**
 * Entry point for host applications to drive the federated module lifecycle.
 */
export declare const linPulsarModuleFederation: {
    init: typeof init;
};
export {};
