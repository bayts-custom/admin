import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { isDefined } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AsArray = (): PropertyDecorator =>
    applyDecorators(
        Transform(({ value }: { value: unknown }) => {
            if (!isDefined(value)) {
                return value;
            }

            return Array.isArray(value) ? (value as unknown[]) : [value];
        }),
    );
