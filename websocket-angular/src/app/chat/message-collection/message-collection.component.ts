import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
import { IncomingErrorDto } from '../types/incoming_error.dto';
import { IncomingMessageDto } from '../types/incoming_message.dto';

@Component( {
    selector: 'chat-message-collection',
    templateUrl: './message-collection.component.html',
    styleUrls: ['./message-collection.component.sass'],
} )
export class MessageCollectionComponent implements OnInit, OnDestroy {
    messages: Array<IncomingMessageDto> = [];
    @Input() room_name: string = '';
    message_subscription!: Subscription;

    constructor ( private chat_service: ChatService ) { }

    ngOnInit (): void {
        console.log( this.room_name );
        this.message_subscription = this.chat_service.messages_recieved.subscribe( {
            next: ( msg ) => {
                console.log( msg );
                if ( msg.event == 'message' ) {
                    const data: IncomingMessageDto = msg.data;
                    console.log( 'message checking', this.room_name );
                    if ( data.room == this.room_name ) {
                        console.log( 'message saved', this.room_name );
                        this.messages.unshift( msg.data as IncomingMessageDto );
                    }
                }
                if ( msg.event == 'error' ) {
                    const data: IncomingErrorDto = msg.data;
                    this.messages.unshift( {
                        author: '' + data.status,
                        room: '*',
                        message: data.description,
                        timestamp: 0,
                    } );
                }
            },
            complete: () => {
                this.messages.unshift( {
                    author: 'Admin',
                    room: '*',
                    message: 'Connection closed',
                    timestamp: 0,
                } );
            },
        } );
    }

    ngOnDestroy (): void {
        this.message_subscription.unsubscribe();
    }
}
