import { Expose } from 'class-transformer';
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { AsDate } from 'src/_decorators/as-date.transformer';
import { WorkType } from '../enums/work-type.enum';
import { Details } from '../enums/details.enum';

export class SaveOrderDto {
    @Expose()
    @IsOptional()
    @IsUUID()
    public id?: string;

    @Expose()
    @IsUUID()
    public carMarkId: string;

    @Expose()
    @IsUUID()
    public carModelId: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public filmId?: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public bossId?: string;

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
    public filmPrice?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    public placePrice?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    public expenses?: number;

    @Expose()
    @IsOptional()
    @IsEnum(WorkType)
    public workType?: WorkType;

    @Expose()
    @IsOptional()
    @IsEnum(Details, { each: true })
    public details?: Details[];

    @Expose()
    @IsOptional()
    @IsNumber()
    public filmLength?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    public complicity?: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public review?: boolean;

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
