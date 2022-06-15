import { Injectable } from '@angular/core';
import { WsMessage } from './types/ws_message.interface';
import { environment } from '../../environments/environment';
import * as axios from 'axios';
import { OutgoingMessageDto } from './types/outgoing_message.dto';
import { Subject } from 'rxjs';


const CHAT_URL = environment.wsUrl;
const API_URL = environment.apiUrl;


@Injectable( {
    providedIn: 'root',
} )
export class ChatService {
    private ws!: WebSocket;
    public messages_recieved!: Subject<WsMessage>;
    public messages_to_send!: Subject<OutgoingMessageDto>;

    constructor () {
        this.connect( CHAT_URL );
    }

    public connect ( url: string ) {
        if ( !this.ws || !this.messages_recieved || !this.messages_to_send ) {
            const data = this.create( url );
            this.ws = data.ws;
            this.messages_recieved = data.rx;
            this.messages_to_send = data.tx;
            console.log( 'Successfully connected: ' + url );
        }
    }

    private create ( url: string ) {
        const ws = new WebSocket( url );
        const rx: Subject<WsMessage> = new Subject<WsMessage>();
        ws.onmessage = ( response: MessageEvent ) => {
            console.log( response.data );
            const data = JSON.parse( response.data );
            rx.next( data );
        };
        ws.onerror = rx.error.bind( rx );
        ws.onclose = rx.complete.bind( rx );
        const tx: Subject<OutgoingMessageDto> = new Subject<OutgoingMessageDto>();
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
        tx.subscribe( observer );
        return { ws, rx, tx };
    }

    async get_all_rooms (): Promise<Array<string>> {
        return axios.default( {
            baseURL: API_URL,
            url: '/rooms/all',
            method: 'get',
        } )
            .then( ( res ) => {
                return res.data;
            } )
            .catch( ( err ) => {
                console.log( err );
                throw err;
            } );
    }
}
