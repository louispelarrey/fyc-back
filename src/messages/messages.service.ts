import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelsService } from 'src/channels/channels.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Messages } from './messages.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Messages)
        private readonly messagesRepository: Repository<Messages>,
        private readonly usersService: UsersService,
        private readonly channelsService: ChannelsService,
    ) { }

    async findAll(): Promise<Messages[]> {
        return await this.messagesRepository.find({ relations: ['senderUser', 'channel']});
    }

    async findOne(id: number): Promise<Messages> {
        return await this.messagesRepository.findOne({ where: { id }, relations: ['senderUser', 'channel']});
    }

    async createMessage(messageString: string, senderId: number, channelId: number): Promise<Messages> {
        const message = new Messages();
        message.message = messageString;
        message.senderUser = await this.usersService.findOne(senderId);
        message.channel = await this.channelsService.getChannel(channelId);
        return await this.messagesRepository.save(message);
    }

    async updateMessage(id: number, messageString: string): Promise<Messages> {
        const message = await this.messagesRepository.findOne({ where: { id } });
        message.message = messageString;
        return await this.messagesRepository.save(message);
    }

    async deleteMessage(id: number): Promise<Messages> {
        const message = await this.messagesRepository.findOne({ where: { id } });
        return await this.messagesRepository.remove(message);
    }
}
