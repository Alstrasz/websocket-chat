import { Body, ConflictException, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Exception, ExceptionTypes } from 'src/exception.interface';
import { RequestWithUser } from 'src/user/interfaces/request_with_user.interface';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access_token.dto';
import { UserCredentialsDto } from './dto/user_credentials.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller( 'auth' )
export class AuthController {
    constructor (
        private auth_service: AuthService,
        private user_serivce: UserService,
    ) {}

    @UseGuards( LocalAuthGuard )
    @Post( 'login' )
    async login ( @Body() _user_credentials_dto: UserCredentialsDto, @Request() req: RequestWithUser ) {
        return new AccessTokenDto( { access_token: this.auth_service.login( req.user ) } );
    }

    @Post( 'register' )
    async register ( @Body() user_credentials_dto: UserCredentialsDto ) {
        const user = await this.user_serivce.create_user( user_credentials_dto ).catch( ( err: Exception ) => {
            if ( err.type == ExceptionTypes.CONFLICT ) {
                throw new ConflictException( `Username '${user_credentials_dto.username}' busy` );
            }
            throw err;
        } );
        return new AccessTokenDto( { access_token: this.auth_service.login( user ) } );
    }
}
