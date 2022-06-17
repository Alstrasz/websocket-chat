import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'auth-credentials',
    templateUrl: './credentials.component.html',
    styleUrls: ['./credentials.component.sass'],
} )
export class CredentialsComponent implements OnInit {
    show_login: boolean = true;

    constructor () { }

    ngOnInit (): void {
    }

    switch_show_login () {
        this.show_login = !this.show_login;
    }
}
