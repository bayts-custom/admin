import { OrderEntity } from 'src/orders/dao/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilmPriceEntity } from './film-price.entity';

@Entity('films')
export class FilmEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar' })
    public name: string;

    @OneToMany(() => OrderEntity, (order) => order.film)
    public orders: OrderEntity[];

    @OneToMany(() => FilmPriceEntity, (price) => price.film)
    public prices: FilmPriceEntity[];
}
