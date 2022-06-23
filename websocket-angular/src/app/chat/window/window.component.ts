import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatService } from '../chat.service';
import { GroupModificationDto } from '../types/group_modification.dto';

@Component( {
    selector: 'chat-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.sass'],
} )
export class WindowComponent implements OnInit, OnDestroy {
    rooms: Array<string> = [];
    active_room = '';
    message_subscription!: Subscription;

    constructor (
        private chat_service: ChatService,
        public auth_service: AuthService,
    ) { }

    ngOnInit (): void {
        this.chat_service.get_all_rooms().then( ( rooms ) => {
            this.rooms = rooms;
            if ( rooms.length > 0 ) {
                this.active_room = rooms[0];
            }
        } );

        this.message_subscription = this.chat_service.messages_recieved.subscribe( {
            next: ( msg ) => {
                if ( msg.event == 'group' ) {
                    const data: GroupModificationDto = msg.data;
                    if ( data.action == 'created' ) {
                        this.rooms.push( data.name );
                    } else if ( data.action == 'deleted' ) {
                        _.remove( this.rooms, ( el ) => {
                            return el == data.name;
                        } );
                        if ( this.active_room == data.name ) {
                            if ( this.rooms.length > 0 ) {
                                this.active_room = this.rooms[0];
                            } else {
                                this.active_room = '';
                            }
                        }
                    }
                }
            },
        } );
    }

    set_room_active ( room: string ) {
        this.active_room = room;
    }

    ngOnDestroy (): void {
        this.message_subscription.unsubscribe();
    }
}
