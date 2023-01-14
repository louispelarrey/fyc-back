import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsController } from './channels.controller';
import { Channels } from './channels.entity';
import { ChannelsService } from './channels.service';

@Module({
    imports: [TypeOrmModule.forFeature([Channels])],
    controllers: [ChannelsController],
    providers: [ChannelsService],
})
export class ChannelsModule {}
