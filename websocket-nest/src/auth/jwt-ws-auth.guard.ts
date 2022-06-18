import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtWsAuthGuard implements CanActivate {
    constructor ( private auth_service: AuthService ) {}

    canActivate (
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const ws_data = context.switchToWs().getData();
        const token = ws_data.Authorization;
        if ( !token ) {
            throw new WsException( { code: 401, description: 'No Authorization field' } );
        }
        try {
            const payload = this.auth_service.verify_token( token );
            if ( !payload ) {
                throw new WsException( { code: 401, description: 'JWT token no valid' } );
            }
            context.switchToWs().getClient().payload = payload;
            return true;
        } catch ( e ) {
            throw new WsException( { status: 'error', code: 401, description: 'JWT token no valid' } );
        }
        return false;
    }
}
