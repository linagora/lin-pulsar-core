import type { Environment } from 'nunjucks';
/**
 * Initializes the shared Nunjucks environment instance.
 * Should be called once by the host application during boot.
 * @param env - The Nunjucks Environment instance to use as the shared environment.
 */
export declare function setNunjucksEnv(env: Environment): void;
/**
 * Returns the shared Nunjucks environment instance.
 * Must be called after initialization via `setNunjucksEnv()`.
 * @returns The shared Nunjucks Environment instance.
 */
export declare function getNunjucksEnv(): Environment;
