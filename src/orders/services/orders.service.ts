import { Injectable, NotFoundException } from '@nestjs/common';

import { OrderEntity } from '../dao/order.entity';
import { OrdersRepository } from '../repositories/orders.repository';
import { SaveOrderDto } from '../dto/save-order.dto';
import { BossesService } from 'src/bosses/services/bosses.service';
import { CarsService } from 'src/cars/services/cars.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly bossesService: BossesService,
        private readonly carsService: CarsService,
    ) {}

    public async get(id: string): Promise<OrderEntity> {
        const order = await this.ordersRepository.get(id);

        if (!order) {
            throw new NotFoundException('Order not found.');
        }

        return order;
    }

    public async getList(): Promise<OrderEntity[]> {
        return this.ordersRepository.getList();
    }

    public async save(body: SaveOrderDto): Promise<OrderEntity> {
        const { bossName, carMarkId, carModelId, ...data } = body;

        let boss = await this.bossesService.getByName(bossName);
        if (!boss && bossName) {
            boss = await this.bossesService.save({
                name: bossName,
            });
        }

        const [mark, model] = await Promise.all([
            this.carsService.getMark(carMarkId),
            this.carsService.getModel(carModelId),
        ])

        const saved = await this.ordersRepository.save({
            ...data,
            dateFrom: data.dateFrom ? new Date(data.dateFrom) : undefined,
            dateTo: data.dateTo ? new Date(data.dateTo) : undefined,
            boss: {
                id: boss?.id,
            },
            carMark: {
                id: mark.id,
            },
            carModel: {
                id: model.id,
            }
        });

        return this.get(saved.id);
    }
}
