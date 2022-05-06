import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { WsMessage } from './types/ws_message.interface';

const CHAT_URL = 'ws://localhost:8000';

@Injectable( {
    providedIn: 'root',
} )
export class ChatService {
    private subject!: AnonymousSubject<MessageEvent>;
    public messages: Subject<WsMessage>;

    constructor () {
        this.messages = <Subject<WsMessage>> this.connect( CHAT_URL ).pipe(
            map(
                ( response: MessageEvent ): WsMessage => {
                    console.log( response.data );
                    const data = JSON.parse( response.data );
                    return data;
                },
            ),
        );
    }

    public connect ( url: string ): AnonymousSubject<MessageEvent> {
        if ( !this.subject ) {
            this.subject = this.create( url );
            console.log( 'Successfully connected: ' + url );
        }
        return this.subject;
    }

    private create ( url: string ): AnonymousSubject<MessageEvent> {
        const ws = new WebSocket( url );
        const observable = new Observable( ( obs: Observer<MessageEvent> ) => {
            ws.onmessage = obs.next.bind( obs );
            ws.onerror = obs.error.bind( obs );
            ws.onclose = obs.complete.bind( obs );
            return ws.close.bind( ws );
        } );
        const observer = {
            error: () => {},
            complete: () => {},
            next: ( data: Object ) => {
                console.log( 'Message sent to websocket: ', data );
                if ( ws.readyState === WebSocket.OPEN ) {
                    ws.send( JSON.stringify( data ) );
                }
            },
        };
        return new AnonymousSubject<MessageEvent>( observer, observable );
    }
}
