import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { RequestWithUser } from './interfaces/request_with_user.interface';

@Controller( 'user' )
export class UserController {
    @Get( 'profile' )
    @UseGuards( JwtAuthGuard )
    async profile ( @Request() req: RequestWithUser ): Promise<UserDto> {
        return new UserDto( req.user );
    }
}
