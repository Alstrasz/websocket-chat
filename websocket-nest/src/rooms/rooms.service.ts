import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DbErrorCodes } from 'src/db_error_codes.enum';
import { ConflictException } from 'src/exception.interface';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

const DEFAULT_ROOMS = [
    { name: 'All' },
    { name: 'Admin' },
    { name: 'Hehe' },
];

@Injectable()
export class RoomsService {
    notify_group_creation?: ( name: string ) => void;
    notify_group_deletion?: ( name: string ) => void;

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

    async create_room ( name: string ) {
        if ( ['all'].indexOf( name ) != -1 ) {
            throw new ConflictException( 'name', name, `Name ${name} is reserved` );
        }
        return this.roomsRepository.insert( { name: name } )
            .catch( ( err ) => {
                if ( err.code == DbErrorCodes.CONFLICT ) {
                    throw new ConflictException( 'name', name );
                }
            } )
            .then( () => {
                if ( this.notify_group_creation ) {
                    this.notify_group_creation( name );
                }
            } );
    }

    async delete_room ( name: string ) {
        return this.roomsRepository.delete( { name: name } )
            .then( () => {
                if ( this.notify_group_deletion ) {
                    this.notify_group_deletion( name );
                }
            } );
    }
}
