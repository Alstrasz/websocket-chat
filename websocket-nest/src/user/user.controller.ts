import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { RequestWithUser } from './interfaces/request_with_user.interface';

@ApiTags( 'User' )
@Controller( 'user' )
export class UserController {
    @ApiOperation( { summary: 'Returns user data if autherized. Mostly used to check if jwt token valid' } )
    @ApiOkResponse( { type: UserDto } )
    @ApiUnauthorizedResponse()
    @ApiBearerAuth()
    @Get( 'profile' )
    @UseGuards( JwtAuthGuard )
    async profile ( @Request() req: RequestWithUser ): Promise<UserDto> {
        return new UserDto( req.user );
    }
}
