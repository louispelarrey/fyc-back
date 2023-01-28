import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from 'src/channels/channels.entity';
import { ChannelsService } from 'src/channels/channels.service';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { MessagesController } from './messages.controller';
import { Messages } from './messages.entity';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Messages, Users, Channels])],
  controllers: [MessagesController],
  providers: [MessagesService, UsersService, ChannelsService],
  exports: [MessagesService],
})
export class MessagesModule {}
