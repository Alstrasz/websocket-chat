import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HmacSHA512 } from 'crypto-js';
import { lib as crypto_lib } from 'crypto-js';
import { Exception, ExceptionTypes } from 'src/exception.interface';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UserCredentialsDto } from './dto/user_credentials.dto';

@Injectable()
export class AuthService {
    constructor (
        @Inject( forwardRef( ()=> UserService ) )
        private user_service: UserService,
        private jwt_service: JwtService,
    ) {}

    private sha512 ( password: string, salt: string ) {
        return { salt, hash: HmacSHA512( password, salt ).toString() };
    }

    create_hash_salt ( password: string ) {
        return this.sha512(
            password,
            crypto_lib.WordArray.random( 32 ).toString().slice( 0, 16 ),
        );
    }

    validate_password ( password: string, hash: string, salt: string ) {
        return hash === this.sha512( password, salt ).hash;
    }

    async validate_user ( user_credentials_dto: UserCredentialsDto ): Promise<User | null> {
        return this.user_service.get_by_username( user_credentials_dto.username )
            .then( ( user: User ) => {
                if ( this.validate_password( user_credentials_dto.password, user.password, user.salt ) ) {
                    return user;
                }
                return null;
            } )
            .catch( ( err: Exception ) => {
                if ( err.type == ExceptionTypes.NOT_FOUND ) {
                    return null;
                }
            } );
    }


    /**
     * Issues JWT token
     *
     * @param {User} user
     * @return {*}
     * @memberof AuthService
     */
    login ( user: User ): string {
        const payload = { username: user.username, sub: user.id };
        return this.jwt_service.sign( payload );
    }
}
