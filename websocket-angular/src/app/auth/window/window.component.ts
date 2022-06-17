import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component( {
    selector: 'auth-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.sass'],
} )
export class WindowComponent implements OnInit {
    constructor ( public auth_service: AuthService ) { }

    ngOnInit (): void {
    }
}
