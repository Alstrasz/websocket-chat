import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component( {
    selector: 'chat-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.sass'],
} )
export class WindowComponent implements OnInit {
    rooms: Array<string> = [];
    active_room = '';

    constructor ( private chat_service: ChatService ) { }

    ngOnInit (): void {
        this.chat_service.get_all_rooms().then( ( rooms ) => {
            this.rooms = rooms;
            if ( rooms.length > 0 ) {
                this.active_room = rooms[0];
            }
        } );
    }

    set_room_active ( room: string ) {
        this.active_room = room;
    }
}
