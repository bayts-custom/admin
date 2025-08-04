import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CarModelEntity } from '../dao/car-model.entity';

export interface CarModelsFilter {
    markId: string;
    search?: string;
}

@Injectable()
export class CarModelsRepository {
    constructor(
        @InjectRepository(CarModelEntity)
        private readonly repository: Repository<CarModelEntity>,
    ) {}

    public get(id: string): Promise<CarModelEntity | null> {
        return this.repository.findOne({
            where: { id },
        });
    }

    public getList(filter: CarModelsFilter): Promise<CarModelEntity[]> {
        return this.repository.find({
            where: [
                {
                    mark: {
                        id: filter.markId,
                    },
                    name: filter.search ? ILike(`%${filter.search.trim()}%`) : undefined,
                },
                {
                    mark: {
                        id: filter.markId,
                    },
                    rusName: filter.search ? ILike(`%${filter.search.trim()}%`) : undefined,
                },
            ],
        });
    }
}
