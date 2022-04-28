import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'chat-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.sass'],
} )
export class SendMessageComponent implements OnInit {
    constructor () { }

    ngOnInit (): void {
    }
}
