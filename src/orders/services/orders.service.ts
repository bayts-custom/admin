import { Injectable, NotFoundException } from '@nestjs/common';

import { OrderEntity } from '../dao/order.entity';
import { OrdersRepository } from '../repositories/orders.repository';
import { SaveOrderDto } from '../dto/save-order.dto';
import { BossesService } from 'src/bosses/services/bosses.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly bossesService: BossesService,
    ) {}

    public async get(id: string): Promise<OrderEntity> {
        const pet = await this.ordersRepository.get(id);

        if (!pet) {
            throw new NotFoundException('Pet not found.');
        }

        return pet;
    }

    public async getList(): Promise<OrderEntity[]> {
        return this.ordersRepository.getList();
    }

    public async save(body: SaveOrderDto): Promise<OrderEntity> {
        const { bossName, bossId, ...data } = body;

        const boss = bossId
            ? await this.bossesService.get(bossId)
            : await this.bossesService.save({
                  name: bossName,
              });

        const saved = await this.ordersRepository.save({
            ...data,
            dateFrom: data.dateFrom ? new Date(data.dateFrom) : undefined,
            dateTo: data.dateTo ? new Date(data.dateTo) : undefined,
            boss: {
                id: boss.id,
            }
        });

        return this.get(saved.id);
    }
}
