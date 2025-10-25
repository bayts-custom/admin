import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { isDate, isDateString, isDefined, isNumber, isString } from 'class-validator';

export interface AsDateOptions {
    /**
        @default 'iso'
    */
    format?: 'iso' | 'isodate' | 'datestamp' | 'timestamp' | 'date' | 'datetime';
    /**
        @default false
    */
    strict?: boolean;
}
export type DateLikeValue<TOptions extends AsDateOptions> = TOptions['format'] extends 'date' | 'datetime'
    ? Date
    : TOptions['format'] extends 'datestamp' | 'timestamp'
      ? number
      : TOptions['format'] extends undefined | 'iso' | 'isodate'
        ? string
        : unknown;

export function asDate<T extends AsDateOptions>(value: unknown, options?: T): DateLikeValue<T> | null | undefined {
    if (!isDefined(value)) {
        return options?.strict ? null : value;
    }

    let date: Date | undefined;

    if (isDate(value)) {
        date = value;
    } else if (isString(value) || isNumber(value)) {
        date = new Date(value);

        if (!isDate(date)) {
            return options?.strict ? null : (value as DateLikeValue<T>);
        }
    }

    if (!date || !isDateString(date.toISOString())) {
        return options?.strict ? null : (value as DateLikeValue<T>);
    }

    switch (options?.format) {
        case 'date':
            date.setUTCHours(0, 0, 0, 0);

            return date as DateLikeValue<T>;

        case 'datetime':
            return date as DateLikeValue<T>;

        case 'datestamp':
            date.setUTCHours(0, 0, 0, 0);

            return date.getTime() as DateLikeValue<T>;

        case 'timestamp':
            return date.getTime() as DateLikeValue<T>;

        case 'isodate':
            return date.toISOString().substring(0, 10) as DateLikeValue<T>;

        case 'iso':
        default:
            return date.toISOString() as DateLikeValue<T>;
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AsDate = (options?: AsDateOptions): PropertyDecorator =>
    applyDecorators(Transform((params) => asDate(params.value as unknown, options)));
