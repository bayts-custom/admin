import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './config';
import { BossesModule } from './bosses/bosses.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: envConfig.pg.host,
            port: Number(envConfig.pg.port),
            username: envConfig.pg.username,
            password: envConfig.pg.password,
            database: envConfig.pg.database,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            ssl: {
                rejectUnauthorized: false,
            },
        }),
        BossesModule,
        OrdersModule,
    ],
})
export class AppModule {}
