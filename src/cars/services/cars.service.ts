import { Injectable, NotFoundException } from '@nestjs/common';

import { CarMarksRepository } from '../repositories/car-marks.repository';
import { CarMarkEntity } from '../dao/car-mark.entity';
import { CarModelsRepository } from '../repositories/car-models.repository';
import { CarModelEntity } from '../dao/car-model.entity';

@Injectable()
export class CarsService {
    constructor(
        private readonly carMarksRepository: CarMarksRepository,
        private readonly carModelsRepository: CarModelsRepository,
    ) {}

    public async getMark(id: string): Promise<CarMarkEntity> {
        const carMark = await this.carMarksRepository.get(id);

        if (!carMark) {
            throw new NotFoundException('Mark not found.');
        }

        return carMark;
    }

    public async getMarksList(search: string, popular?: boolean): Promise<CarMarkEntity[]> {
        return this.carMarksRepository.getList({ search, popular });
    }

    public async getModel(id: string): Promise<CarModelEntity> {
        const carModel = await this.carModelsRepository.get(id);

        if (!carModel) {
            throw new NotFoundException('Model not found.');
        }

        return carModel;
    }

    public async getModelsList(markId: string, search?: string): Promise<CarModelEntity[]> {
        return this.carModelsRepository.getList({ markId, search });
    }
}
