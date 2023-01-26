import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from './messages.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Messages)
        private readonly messagesRepository: Repository<Messages>,
    ) { }

    async findAll(): Promise<Messages[]> {
        return await this.messagesRepository.find();
    }

    async findOne(id: number): Promise<Messages> {
        return await this.messagesRepository.findOne({ where: { id } });
    }

    async createMessage(messageString: string): Promise<Messages> {
        const message = new Messages();
        message.message = messageString;
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
