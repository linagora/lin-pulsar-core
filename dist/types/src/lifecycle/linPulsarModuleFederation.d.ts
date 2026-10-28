import type { RouteRecordRaw } from 'vue-router';
import type { LinPulsarModuleFederationInitOptions } from '../types/linPulsarModuleFederation';
import type { LinPulsarRoute } from '../types/linPulsarRoute';
import type { ModuleHostConfig } from '../types/module';
/**
 * Converts a LinPulsarRoute to a Vue Router RouteRecordRaw.
 *
 * Applies Nunjucks templating to paths and loads components asynchronously, either via Module Federation or from the
 * locally registered components.
 * @param route - The LinPulsarRoute to convert.
 * @param config - Module host configuration for templating.
 * @returns The Vue Router route record.
 */
export declare function toRouteRecordRaw(route: LinPulsarRoute, config: ModuleHostConfig<unknown>): RouteRecordRaw;
/**
 * Recursively renders all string values in an object or array using Nunjucks templating.
 *
 * This is useful for processing route `meta` objects so that template variables (like `{{ config.basePath }}`) are
 * replaced with actual values from the module host configuration.
 * @param obj - The object, array, or string to render. Can be nested.
 * @param config - The ModuleHostConfig object used as the template context.
 * @returns A new object/array/string with all strings rendered using Nunjucks.
 */
export declare function renderMeta(obj: unknown, config: ModuleHostConfig<unknown>): unknown;
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
