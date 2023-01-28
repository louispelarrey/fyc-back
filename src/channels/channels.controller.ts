import { ClassSerializerInterceptor, Controller, NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelsService } from './channels.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';

@Controller('channels')
export class ChannelsController {
    constructor(private readonly ChannelsService: ChannelsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createChannelDto: CreateChannelDto) {
        return this.ChannelsService.createChannel(createChannelDto.name);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.ChannelsService.getChannels();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: number) {
        return this.ChannelsService.getChannel(id);
    }

    @Put(':id')
    @Roles(Role.Admin)
    update(@Param('id') id: number, @Body() updateChannelDto: UpdateChannelDto) {
        if (!this.ChannelsService.updateChannel(id, updateChannelDto.name)) {
            throw new NotFoundException('Channel not found');
        }

        return this.ChannelsService.updateChannel(id, updateChannelDto.name);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    remove(@Param('id') id: number) {
        return this.ChannelsService.deleteChannel(id);
    }
}
