import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsController } from './cars.controller';
import { CarMarkEntity } from './dao/car-mark.entity';
import { CarModelEntity } from './dao/car-model.entity';
import { CarMarksRepository } from './repositories/car-marks.repository';
import { CarModelsRepository } from './repositories/car-models.repository';
import { CarsService } from './services/cars.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarMarkEntity, CarModelEntity])],
    controllers: [CarsController],
    providers: [CarMarksRepository, CarModelsRepository, CarsService],
    exports: [CarsService],
})
export class CarsModule {}
