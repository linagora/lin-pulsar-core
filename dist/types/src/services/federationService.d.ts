import type { ModuleFederation } from '@module-federation/enhanced/runtime';
/**
 * Registers the active Module Federation instance from host for the application.
 *
 * This function must be called exactly once during application startup,
 * after the Module Federation instance has been retrieved  using
 * `getInstance()` from `@module-federation/enhanced/runtime`).
 *
 * Subsequent calls are ignored to prevent accidental re-initialization,
 * which could lead to inconsistent remote resolution or shared dependency
 * conflicts.
 * @param instance - The active Module Federation instance from host.
 */
export declare function setModuleFederation(instance: ModuleFederation): void;
/**
 * Returns the active Module Federation instance.
 *
 * This accessor enforces correct initialization order by throwing an error
 * if the instance has not been registered yet.
 *
 * Consumers must ensure that `setModuleFederation()` has been called during
 * application bootstrap before invoking this function.
 * @throws {Error} If the active Module Federation has not been registered.
 * @returns The registered Module Federation instance.
 */
export declare function getModuleFederation(): ModuleFederation;
/**
 * Loads a remote component using the module federation enhanced runtime.
 * @param plugin - The name of the remote plugin component to load.
 * @returns A Vue async component.
 */
export declare const loadAsyncComponent: (plugin: string) => import("vue").ComponentOptions<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions, any, any, any, string, {}, {}, string, {}, {}, {}, string, import("vue").ComponentProvideOptions> | import("vue").FunctionalComponent<any, {}, any, {}> | {
    new (...args: any[]): any;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
};
