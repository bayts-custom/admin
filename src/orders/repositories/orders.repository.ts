import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { OrderEntity } from '../dao/order.entity';

export interface OrderFilter {
    dateFrom?: Date;
    dateTo?: Date;
}

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly repository: Repository<OrderEntity>,
    ) {}

    public get(id: string): Promise<OrderEntity | null> {
        return this.repository.findOne({
            where: { id },
            relations: {
                boss: true,
                carModel: true,
                carMark: true,
            },
        });
    }

    public getList(filter?: OrderFilter): Promise<OrderEntity[]> {
        return this.repository.find({
            where: [
                {
                    ...this.toWhereOptions(filter),
                    dateTo: filter?.dateFrom ? MoreThanOrEqual(filter.dateFrom) : undefined,
                },
                {
                    ...this.toWhereOptions(filter),
                    dateTo: filter?.dateFrom ? IsNull() : undefined,
                },
            ],
            relations: {
                boss: true,
                carModel: true,
                carMark: true,
            },
        });
    }

    public save(entity: DeepPartial<OrderEntity>): Promise<OrderEntity> {
        return this.repository.save(entity);
    }

    private toWhereOptions(filter?: OrderFilter): FindOptionsWhere<OrderEntity> {
        return {
            dateFrom: filter?.dateTo ? LessThanOrEqual(filter?.dateTo) : undefined,
        };
    }
}
