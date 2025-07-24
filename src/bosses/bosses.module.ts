import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossesController } from './bosses.controller';
import { BossEntity } from './dao/boss.entity';
import { BossesRepository } from './repositories/bosses.repository';
import { BossesService } from './services/bosses.service';

@Module({
    imports: [TypeOrmModule.forFeature([BossEntity])],
    controllers: [BossesController],
    providers: [BossesRepository, BossesService],
    exports: [BossesService],
})
export class BossesModule {}
