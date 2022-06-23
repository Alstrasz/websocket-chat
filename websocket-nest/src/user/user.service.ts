import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserCredentialsDto } from 'src/auth/dto/user_credentials.dto';
import { DbErrorCodes } from 'src/db_error_codes.enum';
import { ConflictException, NotFoundException } from 'src/exception.interface';
import { Repository } from 'typeorm';
import { User } from './user.entity';

const DEFAULT_USERS: Array<UserCredentialsDto> = [
    { username: 'Admin', password: 'qwerty' },
];

@Injectable()
export class UserService {
    constructor (
        @InjectRepository( User )
        private roomsRepository: Repository<User>,
        @Inject( forwardRef( ()=> AuthService ) )
        private auth_service: AuthService,
    ) {
        for ( const user of DEFAULT_USERS ) {
            this.create_user( user ).catch( ( ) => {} );
        }
    }

    async get_by_username ( username: string ): Promise<User> {
        const res = await this.roomsRepository.findOne( { where: { username } } );
        if ( res === null ) {
            throw new NotFoundException( 'username', username );
        }
        return res;
    }

    async get_by_id ( id: string ): Promise<User> {
        const res = await this.roomsRepository.findOne( { where: { id } } );
        if ( res === null ) {
            throw new NotFoundException( 'id', id );
        }
        return res;
    }

    async create_user ( user_credentials_dto: UserCredentialsDto ) {
        const { hash, salt } = this.auth_service.create_hash_salt( user_credentials_dto.password );
        const user_data: Partial<User> = {
            username: user_credentials_dto.username,
            password: hash,
            salt: salt,
        };
        const user = this.roomsRepository.create( user_data );
        return this.roomsRepository.save( user ).catch( ( err ) => {
            if ( err.code == DbErrorCodes.CONFLICT ) {
                throw new ConflictException( 'username', user_credentials_dto.username );
            }
            throw err;
        } );
    }
}
