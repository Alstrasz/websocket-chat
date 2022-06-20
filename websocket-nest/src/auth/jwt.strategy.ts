import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwt_constants } from './constants';
import { UserService } from 'src/user/user.service';
import { ExceptionTypes } from 'src/exception.interface';
import { JwtPayload } from './interfaces/jwt_payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    constructor (
        private user_serivce: UserService,
    ) {
        super( {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwt_constants.SECRET_KEY,
        } );
    }

    async validate ( payload: JwtPayload ) {
        const user = await this.user_serivce.get_by_id( payload.sub )
            .catch( ( err ) => {
                if ( err.type == ExceptionTypes.NOT_FOUND ) {
                    throw new UnauthorizedException( { description: 'No user corresponds to jwt payload', payload } );
                }
            } );
        return user;
    }
}
