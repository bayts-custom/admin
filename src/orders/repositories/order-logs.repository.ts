import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, In, Repository } from 'typeorm';

import { OrderLogEntity } from '../dao/order-log.entity';

export interface OrderLogFilter {
    orderId?: string[];
}

@Injectable()
export class OrderLogsRepository {
    constructor(
        @InjectRepository(OrderLogEntity)
        private readonly repository: Repository<OrderLogEntity>,
    ) {}

    public get(id: string): Promise<OrderLogEntity | null> {
        return this.repository.findOne({
            where: { id },
        });
    }

    public getList(filter?: OrderLogFilter): Promise<OrderLogEntity[]> {
        return this.repository.find({
            where: this.toWhereOptions(filter),
        });
    }

    public save(entity: DeepPartial<OrderLogEntity>): Promise<OrderLogEntity> {
        return this.repository.save(entity);
    }

    private toWhereOptions(filter?: OrderLogFilter): FindOptionsWhere<OrderLogEntity> {
        return {
            orderId: filter.orderId?.length ? In(filter.orderId) : undefined,
        };
    }
}
