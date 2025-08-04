import { Expose } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { AsDate } from 'src/_decorators/as-date.transformer';

export class SaveOrderDto {
    @Expose()
    @IsOptional()
    @IsUUID()
    public id?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public bossName?: string;

    @Expose()
    @IsUUID()
    public carMarkId: string;

    @Expose()
    @IsUUID()
    public carModelId: string;

    @Expose()
    @IsOptional()
    @IsString()
    public description?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    public fullPrice?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    public earn?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    public expenses?: number;

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
}
