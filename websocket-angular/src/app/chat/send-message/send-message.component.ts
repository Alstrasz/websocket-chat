import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component( {
    selector: 'chat-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.sass'],
} )
export class SendMessageComponent implements OnInit {
    message: string = '';
    username: string = '';

    constructor ( private chat_service: ChatService ) {}

    ngOnInit (): void {
    }

    send_message () {
        if ( this.message.trim() == '' ) {
            alert( 'Message should not be empty' );
            return;
        }
        if ( this.username.trim() == '' ) {
            alert( 'Username should not be empty' );
            return;
        }
        this.chat_service.messages.next( {
            data: {
                message: this.message,
                author: this.username,
            },
            event: 'message',
        } );
    }
}
