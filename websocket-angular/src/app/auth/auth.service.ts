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

    constructor () { }

    async login ( user_credentials_dto: UserCredentialsDto ) {
        return axios( {
            method: 'POST',
            baseURL: API_URL,
            url: 'auth/login',
            data: user_credentials_dto,
        } )
            .then( ( res ) => {
                this.user = res.data;
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
                this.user = res.data;
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
    }
}
