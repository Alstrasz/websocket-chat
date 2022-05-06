import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IncomingMessageDto } from '../types/incoming_message.dto';

@Component( {
    selector: 'chat-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.sass'],
} )
export class MessageComponent implements OnInit, OnChanges {
    @Input() message!: IncomingMessageDto;

    message_shown = {
        author: '',
        timestamp: '',
        message: '',
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
        this.message_shown.message = this.message.message;
        this.message_shown.timestamp = new Date( this.message.timestamp * 1000 ).toLocaleString();
    }
}
