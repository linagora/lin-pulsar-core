import type dayjs from 'dayjs';
/**
 * Initializes the shared Dayjs instance.
 * Should be called once by the host application during boot.
 * @param instance - The Dayjs instance to use as the shared instance.
 */
export declare function setDayjsInstance(instance: typeof dayjs): void;
/**
 * Returns the shared Dayjs instance.
 * Must be called after initialization via `setDayjsInstance()`.
 * @returns The shared Dayjs instance.
 */
export declare function getDayjsInstance(): typeof dayjs;
