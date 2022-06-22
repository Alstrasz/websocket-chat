import { Component, OnInit } from '@angular/core';
import { ActionDefaultComponent } from '../action-default/action-default.component';
import { ChatService } from '../chat.service';

@Component( {
    selector: 'chat-action-create-room',
    templateUrl: './action-create-room.component.html',
    styleUrls: ['./action-create-room.component.sass'],
} )
export class ActionCreateRoomComponent extends ActionDefaultComponent implements OnInit {
    room_name: string = '';
    message: string = '';

    constructor ( private chat_service: ChatService ) {
        super();
    }

    ngOnInit (): void {}

    execute () {
        this.message = '';
        this.chat_service.create_room( this.room_name )
            .then( ( val ) => {
                if ( val ) {
                    this.message = val;
                }
            } );
    }
}
