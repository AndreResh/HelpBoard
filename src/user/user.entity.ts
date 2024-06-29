import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from 'typeorm';
import { Request } from '../request/request.entity';
import {RequestInvite} from "../request/request-invite.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    role: string;

    @OneToMany(() => Request, request => request.creator)
    requestsCreated: Request[];

    @ManyToMany(() => Request, request => request.executors)
    requestsExecuted: Request[];

    @OneToMany(() => RequestInvite, invite => invite.user)
    invites: RequestInvite[];
}
