import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { OutgoingErrorDto } from './dto/outgoind_error.dto';

@Catch()
export class AuthWsExceptionsFilter extends BaseWsExceptionFilter {
    catch ( exception: any, host: ArgumentsHost ) {
        if ( exception?.error?.code == 401 ) {
            ( host.switchToWs().getClient() as WebSocket ).send( JSON.stringify( new OutgoingErrorDto( {
                status: exception?.error?.code,
                description: exception?.error?.description,
            } ) ) );
        } else {
            super.catch( exception, host );
        }
    }
}
