import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller( 'rooms' )
export class RoomsController {
    constructor ( private rooms_service: RoomsService ) {}

    @Get( 'all' )
    async get_all_rooms (): Promise<Array<string>> {
        return this.rooms_service.get_rooms();
    }
}
