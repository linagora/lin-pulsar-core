import type { Pinia } from 'pinia';
/**
 * Initializes the shared Pinia store instance.
 * Should be called once by the host application during boot.
 * @param store - The Pinia instance to use as the shared store.
 */
export declare function setPiniaStore(store: Pinia): void;
/**
 * Returns the shared Pinia store instance.
 * Must be called after initialization via `setPiniaStore()`.
 * @returns The shared Pinia instance.
 */
export declare function getPiniaStore(): Pinia;
