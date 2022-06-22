import { Component, Input, OnInit } from '@angular/core';

@Component( {
    selector: 'chat-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.sass'],
} )
export class ActionsComponent implements OnInit {
    @Input() active_room: string = '';

    constructor () { }

    ngOnInit (): void {
    }
}
