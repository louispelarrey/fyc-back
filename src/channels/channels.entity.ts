import { Messages } from "src/messages/messages.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Channels {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Messages, message => message.channel, { cascade: true })
    messages: Messages[];
}