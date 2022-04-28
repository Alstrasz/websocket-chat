import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Message } from '../types/message.iterface';

@Component( {
    selector: 'chat-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.sass'],
} )
export class MessageComponent implements OnInit, OnChanges {
    @Input() message!: Message;

    message_shown = {
        author: '',
        timestamp: '',
        body: '',
    };

    constructor () { }

    ngOnInit (): void {
        this.create_message_shown();
    }

    ngOnChanges ( _changes: SimpleChanges ): void {
        this.create_message_shown();
    }

    create_message_shown (): void {
        this.message_shown.author = this.message.author;
        this.message_shown.body = this.message.body;
        this.message_shown.timestamp = new Date( this.message.timestamp * 1000 ).toLocaleString();
    }
}
