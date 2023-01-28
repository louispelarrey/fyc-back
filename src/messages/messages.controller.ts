import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.messagesService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: number) {
        return this.messagesService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.createMessage(createMessageDto.message, createMessageDto.senderId, createMessageDto.channelId);
    }

    @Put(':id')
    @Roles(Role.Admin)
    update(@Param('id') id: number, @Body() updateMessagesDto: UpdateMessagesDto) {
        if (!this.messagesService.updateMessage(id, updateMessagesDto.message)) {
            throw new NotFoundException('Channel not found');
        }

        return this.messagesService.updateMessage(id, updateMessagesDto.message);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    remove(@Param('id') id: number) {
        return this.messagesService.deleteMessage(id);
    }


}
