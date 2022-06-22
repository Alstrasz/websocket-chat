import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
    @Post( '' )
    @ApiConflictResponse( { type: DefaultException } )
    async create ( @Body() room_selection_dto: RoomSelectionDto ): Promise<void> {
        return this.rooms_service.create_room( room_selection_dto.name )
            .then( () => {
                return;
            } )
            .catch( default_exception_handler );
    }

    @ApiOperation( { summary: 'Deletes room' } )
    @Delete( '' )
    async delete ( @Body() room_selection_dto: RoomSelectionDto ): Promise<void> {
        return this.rooms_service.delete_room( room_selection_dto.name )
            .then( () => {
                return;
            } );
    }
}
