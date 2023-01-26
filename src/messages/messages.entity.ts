import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';
import { Channels } from 'src/channels/channels.entity';
import { Users} from 'src/users/users.entity';

@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column({ default: Date.now() })
    date: Date;

    @ManyToOne(type => Channels, channel => channel.messages)
    channel: Channels;

    @ManyToOne(type => Users, user => user.messages)
    senderUser: Users;
}
