import { Controller, Get, Param, ParseBoolPipe, ParseUUIDPipe, Query } from '@nestjs/common';

import { CarsService } from './services/cars.service';
import { CarModelEntity } from './dao/car-model.entity';
import { CarMarkEntity } from './dao/car-mark.entity';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}
    @Get('marks')
    public async getMarksList(
        @Query('search') search: string,
        @Query('popular', new ParseBoolPipe({ optional: true })) popular: boolean,
    ): Promise<CarMarkEntity[]> {
        return this.carsService.getMarksList(search, popular);
    }

    @Get('models')
    public async getModelsList(
        @Query('search') search: string,
        @Query('markId', new ParseUUIDPipe()) markId: string,
    ): Promise<CarModelEntity[]> {
        return this.carsService.getModelsList(markId, search);
    }

    @Get('marks/:id')
    public async getMark(@Param('id') id: string): Promise<CarMarkEntity> {
        return this.carsService.getMark(id);
    }

    @Get('models/:id')
    public async getModel(@Param('id') id: string): Promise<CarModelEntity> {
        return this.carsService.getModel(id);
    }
}
