import type { ModulePageLifecycleHostOptions, ModulePageLifecycleOptions } from '../types/modulePageLifecycle';
import { BasicRemoteModule } from './skeleton';
/**
 * Creates the default lifecycle module for a federated page module.
 *
 * The returned instance should be the default export of the file exposed as
 * the module's lifecycle entry in the federation configuration. The host
 * application loads it during boot and drives all lifecycle phases; nothing
 * else needs to be called by the plugin.
 *
 * Any lifecycle phase can be overridden through the `hooks` option; an
 * overridden phase fully replaces the default behavior of that phase.
 * @template T Type of the module-specific options provided in the host configuration.
 * @param options - The creation options describing the module.
 * @returns The remote module instance to expose to the host application.
 */
export declare function createModulePageLifecycle<T extends ModulePageLifecycleHostOptions = ModulePageLifecycleHostOptions>(options: ModulePageLifecycleOptions<T>): BasicRemoteModule<T>;
