import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy( Strategy ) {
    constructor ( private auth_service: AuthService ) {
        super();
    }

    async validate ( username: string, password: string ): Promise<User> {
        const user = await this.auth_service.validate_user( { username, password } );
        if ( !user ) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
