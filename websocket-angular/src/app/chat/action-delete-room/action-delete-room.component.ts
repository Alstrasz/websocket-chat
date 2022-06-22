import { Component, Input, OnInit } from '@angular/core';
import { ActionDefaultComponent } from '../action-default/action-default.component';
import { ChatService } from '../chat.service';

@Component( {
    selector: 'chat-action-delete-room',
    templateUrl: './action-delete-room.component.html',
    styleUrls: ['./action-delete-room.component.sass'],
} )
export class ActionDeleteRoomComponent extends ActionDefaultComponent implements OnInit {
    @Input() room_name: string = '';

    constructor ( private chat_service: ChatService ) {
        super();
    }

    ngOnInit (): void {}

    execute () {
        this.chat_service.delete_room( this.room_name );
    }
}
