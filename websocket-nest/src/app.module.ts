import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';

@Module( {
    imports: [
        TypeOrmModule.forRoot( {
            type: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: parseInt( process.env.POSTGRES_PORT || '5432' ),
            username: 'root',
            password: 'root',
            database: 'test',
            synchronize: true,
            autoLoadEntities: true,
        } ),
        ChatModule,
        RoomsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
} )
export class AppModule {}
