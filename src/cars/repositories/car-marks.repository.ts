import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CarMarkEntity } from '../dao/car-mark.entity';

export interface CarMarksFilter {
    search: string;
    popular?: boolean;
}

@Injectable()
export class CarMarksRepository {
    constructor(
        @InjectRepository(CarMarkEntity)
        private readonly repository: Repository<CarMarkEntity>,
    ) {}

    public get(id: string): Promise<CarMarkEntity | null> {
        return this.repository.findOne({
            where: { id },
        });
    }

    public getList(filter: CarMarksFilter): Promise<CarMarkEntity[]> {
        return this.repository.find({
            where: [
                {
                    popular: filter.popular || undefined,
                    name: filter.search ? ILike(`%${filter.search.trim()}%`) : undefined,
                },
                {
                    popular: filter.popular || undefined,
                    rusName: filter.search ? ILike(`%${filter.search.trim()}%`) : undefined,
                },
            ],
        });
    }
}
