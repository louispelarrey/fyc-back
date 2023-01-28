import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Messages } from 'src/messages/messages.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column()
    nickname: string;

    @Column()
    role: string;
    
    @OneToMany(type => Messages, message => message.senderUser)
    messages: Messages[];
}
