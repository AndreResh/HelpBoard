import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import {User} from '../user/user.entity';
import {HelpType} from './label';
import {RequestInvite} from "./request-invite.entity";

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

    @Column()
    executorsCount: number;

    @Column('decimal', {precision: 9, scale: 6, nullable: true})
    latitude: number;

    @Column('decimal', {precision: 9, scale: 6, nullable: true})
    longitude: number;

    @ManyToOne(() => User, user => user.requestsCreated)
    creator: User;

    @ManyToMany(() => User, user => user.requestsExecuted)
    @JoinTable({
        name: 'request_executors',
        joinColumn: {
            name: 'request_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    executors: User[];
    @OneToMany(() => RequestInvite, invite => invite.request)
    invites: RequestInvite[];
}
