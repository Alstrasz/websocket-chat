import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserCredentialsDto } from '../types/user_credentials.dto';

@Component( {
    selector: 'auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass'],
} )
export class LoginComponent implements OnInit {
    error: string = '';

    data: UserCredentialsDto = { username: '', password: '' };

    constructor ( private auth_service: AuthService ) { }

    ngOnInit (): void {
    }

    send_login () {
        this.error = '';
        this.auth_service.login( this.data )
            .then( ( val: boolean ) => {
                if ( val ) {
                    this.error = '';
                } else {
                    console.log( 401 );
                    this.error = 'Username or password incorrect';
                }
            } )
            .catch( ( err ) => {
                console.log( 'login err', err );
                this.error = 'Unexpected error encountered';
            } );
    }
}
