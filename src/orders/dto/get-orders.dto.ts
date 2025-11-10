import { Expose } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsIn, IsOptional } from 'class-validator';
import { AsDate } from 'src/_decorators/as-date.transformer';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderSort } from '../enums/order-sort.enum';
import { AsArray } from 'src/_transformers/as-array.transformer';

export class GetOrdersDto {
    @Expose()
    @IsOptional()
    @AsDate()
    @IsDateString()
    public dateFrom?: string;

    @Expose()
    @IsOptional()
    @AsDate()
    @IsDateString()
    public dateTo?: string;

    @Expose()
    @IsOptional()
    @AsArray()
    @IsArray()
    @IsEnum(OrderStatus, { each: true })
    public status?: OrderStatus[];

    @Expose()
    @IsOptional()
    @IsEnum(OrderSort)
    public orderBy?: OrderSort;

    @Expose()
    @IsOptional()
    @IsIn(['asc', 'desc'])
    public order?: 'asc' | 'desc';
}
