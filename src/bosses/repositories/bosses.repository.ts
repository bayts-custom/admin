import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';

import { BossEntity } from '../dao/boss.entity';

@Injectable()
export class BossesRepository {
    constructor(
        @InjectRepository(BossEntity)
        private readonly repository: Repository<BossEntity>,
    ) {}

    public get(id: string, withRelations: boolean = true): Promise<BossEntity | null> {
        return this.repository.findOne({
            where: { id },
            relations: withRelations ? {
                orders: true,
            } : undefined,
        });
    }

    public getByName(name: string): Promise<BossEntity | null> {
        return this.repository.findOne({
            where: { name },
        });
    }

    public getList(): Promise<BossEntity[]> {
        return this.repository.find();
    }

    public save(entity: Partial<BossEntity>): Promise<BossEntity> {
        return this.repository.save(entity);
    }
}
