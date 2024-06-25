import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Message } from './message.entity';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    type: string;

    @ManyToOne(() => User)
    user1: User;

    @ManyToOne(() => User)
    user2: User;

    @OneToMany(() => Message, message => message.chat)
    messages: Message[];
}
