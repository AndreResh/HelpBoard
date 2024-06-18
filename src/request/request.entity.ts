import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from '../user/user.entity';
import {HelpType} from './label';

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column("character varying", {array: true, nullable: true})
    labels: HelpType[];

    @Column()
    status: string;

    @Column('decimal', {precision: 9, scale: 6, nullable: true})
    latitude: number;

    @Column('decimal', {precision: 9, scale: 6, nullable: true})
    longitude: number;

    @ManyToOne(() => User, user => user.requestsCreated)
    creator: User;

    @ManyToOne(() => User, user => user.requestsAssigned, {nullable: true})
    executor: User;
}
