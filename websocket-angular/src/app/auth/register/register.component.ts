import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component( {
    selector: 'auth-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass'],
} )
export class RegisterComponent implements OnInit {
    error = '';

    username: string = '';
    password: string = '';
    password_repeat: string = '';

    constructor ( private auth_service: AuthService ) { }

    ngOnInit (): void {
    }

    send_register () {
        if ( this.username.length < 4 ) {
            this.error = 'Username should contain at lest 4 symbols';
            return;
        }
        if ( this.username.length > 16 ) {
            this.error = 'Username should contain no more then 16 symbols';
            return;
        }
        if ( this.password.length < 4 ) {
            this.error = 'Password should contain at lest 6 symbols';
            return;
        }
        if ( this.password.length > 16 ) {
            this.error = 'Password should contain no more then 32 symbols';
            return;
        }
        if ( this.password !== this.password_repeat ) {
            this.error = 'Repeated passwords do not match';
            return;
        }
        this.auth_service.register( {
            username: this.username,
            password: this.password,
        } )
            .then( ( val: boolean ) => {
                if ( val ) {
                    this.error = '';
                } else {
                    console.log( 409 );
                    this.error = 'User with such username already exists';
                }
            } )
            .catch( ( err ) => {
                console.log( 'login err', err );
                this.error = 'Unexpected error encountered';
            } );
    }
}
