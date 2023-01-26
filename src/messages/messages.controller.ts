import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    create(@Body() updateMessagesDto: UpdateMessagesDto) {
        return this.messagesService.createMessage(updateMessagesDto.message);
    }

    // get all channels
    @Get()
    findAll() {
        return this.messagesService.findAll();
    }

    // get a single channel
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.messagesService.findOne(id);
    }

    // update a channel

    @Put(':id')
    update(@Param('id') id: number, @Body() updateMessagesDto: UpdateMessagesDto) {
        if (!this.messagesService.updateMessage(id, updateMessagesDto.message)) {
            throw new NotFoundException('Channel not found');
        }

        return this.messagesService.updateMessage(id, updateMessagesDto.message);
    }

    // delete a channel
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.messagesService.deleteMessage(id);
    }


}
