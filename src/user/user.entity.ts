import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Request } from '../request/request.entity';

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

    @OneToMany(() => Request, request => request.executor)
    requestsAssigned: Request[];
}
