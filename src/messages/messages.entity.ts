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

    @ManyToOne(() => Channels, channel => channel.messages, { onDelete: 'CASCADE' })
    channel: Channels;

    @ManyToOne(() => Users, user => user.messages, { onDelete: 'CASCADE' })
    senderUser: Users;
}
