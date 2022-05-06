import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { IncomingMessageDto } from '../types/incoming_message.dto';

@Component( {
    selector: 'chat-message-collection',
    templateUrl: './message-collection.component.html',
    styleUrls: ['./message-collection.component.sass'],
} )
export class MessageCollectionComponent implements OnInit {
    messages: Array<IncomingMessageDto> = [];

    constructor ( private chat_service: ChatService ) {
        chat_service.messages.subscribe( ( msg ) => {
            if ( msg.event == 'message' ) {
                this.messages.unshift( msg.data as IncomingMessageDto );
            }
        } );
    }

    ngOnInit (): void {
    }
}
