import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

const DEFAULT_ROOMS = [
    { name: 'All' },
    { name: 'Admin' },
    { name: 'Hehe' },
];

@Injectable()
export class RoomsService {
    constructor (
        @InjectRepository( Room )
        private roomsRepository: Repository<Room>,
    ) {
        for ( const room of DEFAULT_ROOMS ) {
            roomsRepository.upsert( room, { conflictPaths: ['name'] } );
        }
    }

    async get_rooms (): Promise<Array<string>> {
        return ( await this.roomsRepository.find() ).map( ( el ) => el.name );
    }
}
