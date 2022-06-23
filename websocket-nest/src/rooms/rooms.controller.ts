import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminOnlyGuard } from 'src/auth/admin_only.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DefaultException, default_exception_handler } from 'src/exception.interface';
import { RoomSelectionDto } from './dto/room_selection.dto';
import { RoomsService } from './rooms.service';

@ApiTags( 'Rooms' )
@Controller( 'rooms' )
export class RoomsController {
    constructor ( private rooms_service: RoomsService ) {}

    @ApiOperation( { summary: 'Returns all rooms stored in db' } )
    @Get( '' )
    @ApiOkResponse( { type: [String] } )
    async get_all_rooms (): Promise<Array<string>> {
        return this.rooms_service.get_rooms();
    }

    @ApiOperation( { summary: 'Creates new room if it is valid' } )
    @ApiBearerAuth()
    @Post( '' )
    @ApiConflictResponse( { type: DefaultException } )
    @ApiForbiddenResponse( {
        description: 'Triggers if user not Admin',
    } )
    @UseGuards( JwtAuthGuard, AdminOnlyGuard )
    async create ( @Body() room_selection_dto: RoomSelectionDto ): Promise<void> {
        return this.rooms_service.create_room( room_selection_dto.name )
            .then( () => {
                return;
            } )
            .catch( default_exception_handler );
    }

    @ApiOperation( { summary: 'Deletes room' } )
    @ApiForbiddenResponse( {
        description: 'Triggers if user not Admin',
    } )
    @ApiBearerAuth()
    @Delete( '' )
    @UseGuards( JwtAuthGuard, AdminOnlyGuard )
    async delete ( @Body() room_selection_dto: RoomSelectionDto ): Promise<void> {
        return this.rooms_service.delete_room( room_selection_dto.name )
            .then( () => {
                return;
            } );
    }
}
