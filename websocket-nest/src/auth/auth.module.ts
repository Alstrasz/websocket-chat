import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwt_constants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module( {
    imports: [
        forwardRef( () => UserModule ),
        PassportModule,
        JwtModule.register( {
            secret: jwt_constants.SECRET_KEY,
            signOptions: { expiresIn: '1d' },
        } ),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService],
} )
export class AuthModule {}
