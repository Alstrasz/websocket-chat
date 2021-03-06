import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';

@Module( {
    imports: [TypeOrmModule.forFeature( [Room] )],
    controllers: [RoomsController],
    providers: [RoomsService],
    exports: [RoomsService],
} )
export class RoomsModule {}
