import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OutgoingMessageDto } from './dto/outgoing_message.dto';
import { IncomingMessageDto } from './dto/incoming_message.dto';
import { Server, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { JwtWsAuthGuard } from 'src/auth/jwt-ws-auth.guard';
import { AuthWsExceptionsFilter } from './auth-ws-exception.filter';
import { WsWithCredentials } from 'src/auth/interfaces/ws_with_credentials.interface';
import { GroupModificationDto } from './dto/group_modification.dto';
import { RoomsService } from 'src/rooms/rooms.service';

@WebSocketGateway( parseInt( process.env.WS_PORT || '8000' ), { transports: ['websockets'], cors: true } )
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    connection_counter: number = 0;
    sockets: Map<WebSocket, number> = new Map();
    @WebSocketServer()
        server!: Server;
    private readonly logger = new Logger( ChatGateway.name );

    constructor ( private rooms_service: RoomsService ) { }

    afterInit ( _server: Server ) {
        this.rooms_service.notify_group_creation = this.notify_group_creation.bind( this );
        this.rooms_service.notify_group_deletion = this.notify_group_deletion.bind( this );
        this.logger.debug( 'Initialized' );
    }

    async handleConnection ( socket: WebSocket, _args: IncomingMessage ) {
        this.logger.debug( `Got connection ${this.connection_counter}` );
        this.sockets.set( socket, this.connection_counter );
        this.connection_counter += 1;
        // console.log( args.headers );
        // await this.chatService.getUserFromSocket( socket );
    }

    async handleDisconnect ( socket: WebSocket ) {
        const connection = this.sockets.get( socket );
        this.logger.debug( `Disconnected ${connection}` );
        this.sockets.delete( socket );
    }

    notify_group_creation ( name: string ) {
        this.braodcast_to_all( new GroupModificationDto( {
            action: 'created',
            name: name,
        } ) );
    }

    notify_group_deletion ( name: string ) {
        this.braodcast_to_all( new GroupModificationDto( {
            action: 'deleted',
            name: name,
        } ) );
    }

    braodcast_to_all ( message ) {
        this.server.clients.forEach( ( client ) => {
            client.send( JSON.stringify( message ) );
        } );
    }

    @UseGuards( JwtWsAuthGuard )
    @UseFilters( new AuthWsExceptionsFilter() )
    @SubscribeMessage( 'message' )
    handleMessage ( @MessageBody() incoming_message: WsWithCredentials<IncomingMessageDto> ): void {
        this.logger.debug( JSON.stringify( incoming_message ) );
        const outgoing_message = new OutgoingMessageDto( {
            author: incoming_message.Authorization.username,
            message: incoming_message.message,
            room: incoming_message.room,
            timestamp: Math.floor( Date.now() / 1000 ),
        } );
        this.braodcast_to_all( outgoing_message );
    }
}
