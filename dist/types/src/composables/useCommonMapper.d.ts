import type { Dayjs } from 'dayjs';
import type { LinPulsarAttributeConfiguration } from '..';
/**
 * Common mapper for data transformations.
 * @returns Functions to convert datas.
 */
export declare function useCommonMapper(): {
    toDate: (value: unknown, formatKey: string) => string;
    toDateISO: (value: unknown, formatKey: string) => string;
    toEmptyRecord: <T>(fields: LinPulsarAttributeConfiguration[]) => T;
    toDayJs: (value: unknown) => Dayjs | null;
    formatDate: (date: unknown, outputFormat: string, inputFormat?: string) => string;
};
