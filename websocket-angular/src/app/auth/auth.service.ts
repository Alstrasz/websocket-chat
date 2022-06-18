import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { User } from './types/user.dto';
import { UserCredentialsDto } from './types/user_credentials.dto';

const API_URL = environment.apiUrl;


@Injectable( {
    providedIn: 'root',
} )
export class AuthService {
    user: User | null = null;
    token: string | null = null;

    constructor () {
        this.token = this.get_token();
        this.retrieve_user();
    }

    async login ( user_credentials_dto: UserCredentialsDto ) {
        return axios( {
            method: 'POST',
            baseURL: API_URL,
            url: 'auth/login',
            data: user_credentials_dto,
        } )
            .then( ( res ) => {
                this.set_token( res.data.access_token );
                this.retrieve_user();
                return true;
            } )
            .catch( ( err ) => {
                if ( err && err.response.status == 401 ) {
                    return false;
                } else {
                    throw err;
                }
            } );
    }

    async register ( user_credentials_dto: UserCredentialsDto ) {
        return axios( {
            method: 'POST',
            baseURL: API_URL,
            url: 'auth/register',
            data: user_credentials_dto,
        } )
            .then( ( res ) => {
                this.set_token( res.data.access_token );
                this.retrieve_user();
                return true;
            } )
            .catch( ( err ) => {
                if ( err && err.response.status == 409 ) {
                    return false;
                } else {
                    throw err;
                }
            } );
    }

    async logout () {
        this.user = null;
        this.clear_token();
    }

    set_token ( token: string ) {
        this.token = token;
        window.localStorage.setItem( 'jwt', token );
    }

    clear_token () {
        this.token = null;
        window.localStorage.removeItem( 'jwt' );
    }

    get_token () {
        return window.localStorage.getItem( 'jwt' );
    }

    retrieve_user () {
        if ( this.token ) {
            axios( {
                method: 'GET',
                baseURL: API_URL,
                url: 'user/profile',
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            } )
                .then( ( res ) => {
                    this.user = res.data;
                } )
                .catch( ( err ) => {
                    if ( err && err.response.status == 401 ) {

                    } else {
                        alert( 'Error occured while retrieving user' );
                    }
                    console.log( err );
                    this.logout();
                } );
        }
    }
}
