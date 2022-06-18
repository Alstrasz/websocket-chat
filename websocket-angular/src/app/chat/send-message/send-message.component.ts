import { Component, Input, OnInit } from '@angular/core';
import { OutgoingMessageDto } from '../types/outgoing_message.dto';
import { ChatService } from '../chat.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component( {
    selector: 'chat-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.sass'],
} )
export class SendMessageComponent implements OnInit {
    @Input() active_room_name: string = '';
    message: string = '';
    username: string = '';

    constructor (
        private chat_service: ChatService,
        private auth_serivce: AuthService,
    ) {}

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
        if ( this.auth_serivce.token === null ) {
            alert( 'You should be signed in' );
            return;
        }
        const message: OutgoingMessageDto = {
            data: {
                Authorization: this.auth_serivce.token,
                message: this.message,
                author: this.username,
                room: this.active_room_name,
            },
            event: 'message',
        };
        this.chat_service.messages_to_send.next( message );
    }
}
