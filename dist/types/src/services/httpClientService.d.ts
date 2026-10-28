import type { AxiosInstance } from 'axios';
/**
 * Initializes the shared HTTP client instance.
 * Should be called once by the host application during boot.
 * @param client - The Axios instance to use as the shared HTTP client.
 */
export declare function setHttpClient(client: AxiosInstance): void;
/**
 * Returns the shared HTTP client instance.
 * Must be called after initialization via `setHttpClient()`.
 * @returns The shared Axios instance.
 */
export declare function getHttpClient(): AxiosInstance;
