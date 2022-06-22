import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component( {
    selector: 'chat-action-default',
    templateUrl: './action-default.component.html',
    styleUrls: ['./action-default.component.sass'],
} )
export class ActionDefaultComponent {
    @Input()
        is_active: boolean = false;

    @Output()
        is_activeChange = new EventEmitter<boolean>();

    toggle_active () {
        this.is_active = !this.is_active;
        this.is_activeChange.emit( this.is_active );
    }
}
