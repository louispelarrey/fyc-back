import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Channels } from "./channels.entity";

@Injectable()
export class ChannelsService {
    constructor(
        @InjectRepository(Channels)
        private readonly channelRepository: Repository<Channels>,
    ) { }

    async getChannels() {
        return await this.channelRepository.find();
    }

    async getChannel(id: number) {
        return await this.channelRepository.findOne({ where: { id } });
    }

    async createChannel(name: string) {
        const channel = new Channels();
        channel.name = name;
        return await this.channelRepository.save(channel);
    }

    async updateChannel(id: number, name: string) : Promise<Channels | {statusCode: number, error: string}> {
        const channel = await this.channelRepository.findOne({ where: { id } });
        if (!channel) {
            return { statusCode: 404, error: 'Channel not found' };
        }
        channel.name = name;
        return await this.channelRepository.save(channel);
    }

    async deleteChannel(id: number) {
        const channel = await this.channelRepository.findOne({ where: { id } });
        return await this.channelRepository.remove(channel);
    }
}