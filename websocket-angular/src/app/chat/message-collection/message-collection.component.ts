import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
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
        this.message_subscription = this.chat_service.messages.subscribe( ( msg ) => {
            if ( msg.event == 'message' ) {
                const data: IncomingMessageDto = msg.data;
                console.log( 'message checking', this.room_name );
                if ( data.room == this.room_name ) {
                    console.log( 'message saved', this.room_name );
                    this.messages.unshift( msg.data as IncomingMessageDto );
                }
            }
        } );
    }

    ngOnDestroy (): void {
        this.message_subscription.unsubscribe();
    }
}
