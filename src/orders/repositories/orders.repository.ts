import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { OrderEntity } from '../dao/order.entity';
import { OrderSort } from '../enums/order-sort.enum';
import { OrderStatus } from '../enums/order-status.enum';

export interface OrderFilter {
    dateFrom?: Date;
    dateTo?: Date;
    status?: OrderStatus[];
    orderBy?: OrderSort;
    order?: 'asc' | 'desc';
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
                film: {
                    prices: true,
                },
                logs: true,
            },
        });
    }

    public getList(filter?: OrderFilter): Promise<OrderEntity[]> {
        const { orderBy, order } = filter ?? {};
        return this.repository.find({
            where: this.toWhereOptions(filter),
            relations: {
                boss: true,
                carModel: true,
                carMark: true,
                film: {
                    prices: true,
                },
                logs: true,
            },
            order:
                orderBy && order
                    ? {
                          [orderBy]: order,
                      }
                    : undefined,
        });
    }

    public save(entity: DeepPartial<OrderEntity>): Promise<OrderEntity> {
        return this.repository.save(entity);
    }

    private toWhereOptions(filter?: OrderFilter): FindOptionsWhere<OrderEntity> {
        return {
            dateTo: filter?.dateFrom ? MoreThanOrEqual(filter.dateFrom) : undefined,
            dateFrom: filter?.dateTo ? LessThanOrEqual(filter?.dateTo) : undefined,
            status: filter?.status?.length ? In(filter.status) : undefined,
        };
    }
}
