import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RequestWithUser } from 'src/user/interfaces/request_with_user.interface';


@Injectable()
export class AdminOnlyGuard implements CanActivate {
    canActivate ( context: ExecutionContext ): boolean {
        const req: RequestWithUser = context.switchToHttp().getRequest();

        if ( req.user.username == 'Admin' ) {
            return true;
        } else {
            throw new ForbiddenException( {
                type: 'forbidden',
                description: 'Only Admin can access this',
            } );
        }

        return false;
    }
}
