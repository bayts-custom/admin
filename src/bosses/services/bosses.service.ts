import { Injectable, NotFoundException } from '@nestjs/common';

import { BossEntity } from '../dao/boss.entity';
import { BossesRepository } from '../repositories/bosses.repository';
import { SaveBossDto } from '../dto/save-boss.dto';

@Injectable()
export class BossesService {
    constructor(private readonly bossesRepository: BossesRepository) {}

    public async get(id: string, withRelations: boolean = true): Promise<BossEntity> {
        const boss = await this.bossesRepository.get(id, withRelations);

        if (!boss) {
            throw new NotFoundException('Boss not found.');
        }

        return boss;
    }

    public async getByName(name: string): Promise<BossEntity | null> {
        return this.bossesRepository.getByName(name);
    }

    public async getList(): Promise<BossEntity[]> {
        return this.bossesRepository.getList();
    }

    public async save(body: SaveBossDto): Promise<BossEntity> {
        return this.bossesRepository.save(body);
    }
}
