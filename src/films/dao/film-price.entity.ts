import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('film-prices')
export class FilmPriceEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @Column({ type: 'uuid' })
    public filmId: string;

    @Column({ type: 'bigint' })
    public amount: bigint;

    @ManyToOne(() => FilmEntity, (film) => film.prices)
    public film: FilmEntity;
}
