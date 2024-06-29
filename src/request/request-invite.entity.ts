import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Request } from './request.entity';

@Entity()
export class RequestInvite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Request, request => request.invites)
    request: Request;

    @ManyToOne(() => User, user => user.invites)
    user: User;

    @Column({ default: 'pending' })
    status: string;
}
