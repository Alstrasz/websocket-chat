import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module( {
    imports: [
        forwardRef( () => UserModule ),
        PassportModule,
    ],
    providers: [
        AuthService,
        LocalStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService],
} )
export class AuthModule {}