import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ nullable: true})
    patronymic: string;
}
