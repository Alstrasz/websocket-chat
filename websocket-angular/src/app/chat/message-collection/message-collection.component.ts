import { Component, OnInit } from '@angular/core';
import { Message } from '../types/message.iterface';

@Component( {
    selector: 'chat-message-collection',
    templateUrl: './message-collection.component.html',
    styleUrls: ['./message-collection.component.sass'],
} )
export class MessageCollectionComponent implements OnInit {
    messages: Array<Message> = [
        {
            author: 'u1',
            timestamp: 0,
            body: 'm1',
        },
        {
            author: 'u1',
            timestamp: 1,
            body: 'm2',
        },
        {
            author: 'u1',
            timestamp: 2,
            body: 'm3',
        },
        {
            author: 'u1',
            timestamp: 3,
            body: 'm4',
        },{
            author: 'u1',
            timestamp: 0,
            body: 'm1',
        },
        {
            author: 'u1',
            timestamp: 1,
            body: 'm2',
        },
        {
            author: 'u1',
            timestamp: 2,
            body: 'm3',
        },
        {
            author: 'u1',
            timestamp: 3,
            body: 'm4',
        },
    ];
    constructor () { }

    ngOnInit (): void {
    }
}
