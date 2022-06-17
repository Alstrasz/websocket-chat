import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component( {
    selector: 'auth-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.sass'],
} )
export class ControlsComponent implements OnInit {
    constructor ( public auth_service: AuthService ) { }

    ngOnInit (): void {
    }

    send_logout () {
        this.auth_service.logout();
    }
}
