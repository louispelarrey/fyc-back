import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Messages } from 'src/messages/messages.entity';
import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/enums/role.enum';

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

    @Column({ default: JSON.stringify([Role.User])})
    roles: string;
    
    @OneToMany(() => Messages, message => message.senderUser, { cascade: true })
    messages: Messages[];
}
