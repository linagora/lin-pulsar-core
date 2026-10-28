import type { ModuleHostConfig } from '../types/module';
/**
 * Registers a module host configuration in the global store.
 * If a configuration with the same `instanceId` already exists, it will be overwritten.
 * @param hostConfig - The configuration object of the module host to register.
 */
export declare function registerModuleHostConfiguration(hostConfig: ModuleHostConfig<unknown>): void;
/**
 * Retrieves a module host configuration by its `instanceId`.
 * @param instanceId - The unique identifier of the module host.
 * @template T Type of the module-specific options.
 * @throws {Error} If no module host configuration is found for the given instanceId.
 * @returns The `ModuleHostConfig` associated with the given `instanceId`.
 */
export declare function getModuleHostConfiguration<T>(instanceId: string): ModuleHostConfig<T>;
