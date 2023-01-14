import { Controller, NotFoundException } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelsService } from './channels.service';

// this is used to create a new channel in a discord like app
@Controller('channels')
export class ChannelsController {
    constructor(private readonly ChannelsService: ChannelsService) { }

    @Post()
    create(@Body() createChannelDto: CreateChannelDto) {
        return this.ChannelsService.createChannel(createChannelDto.name);
    }

    // get all channels
    @Get()
    findAll() {
        return this.ChannelsService.getChannels();
    }

    // get a single channel
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.ChannelsService.getChannel(id);
    }

    // update a channel

    @Put(':id')
    update(@Param('id') id: number, @Body() updateChannelDto: UpdateChannelDto) {
        if (!this.ChannelsService.updateChannel(id, updateChannelDto.name)) {
            throw new NotFoundException('Channel not found');
        }

        return this.ChannelsService.updateChannel(id, updateChannelDto.name);
    }

    // delete a channel
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.ChannelsService.deleteChannel(id);
    }
}
