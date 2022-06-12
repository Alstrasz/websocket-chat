import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';

@Module( {
    imports: [ChatModule, RoomsModule],
    controllers: [AppController],
    providers: [AppService],
} )
export class AppModule {}
