import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserCredentialsDto } from 'src/auth/dto/user_credentials.dto';
import { ConflictException, NotFoundException } from 'src/exception.interface';
import { Repository } from 'typeorm';
import { User } from './user.entity';

const DEFAULT_USERS = [
    { username: 'Admin', password: 'a' },
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

    async create_user ( user_credentials_dto: UserCredentialsDto ) {
        const { hash, salt } = this.auth_service.create_hash_salt( user_credentials_dto.password );
        const user_data: Partial<User> = {
            username: user_credentials_dto.username,
            password: hash,
            salt: salt,
        };
        const user = this.roomsRepository.create( user_data );
        return this.roomsRepository.save( user ).catch( ( err ) => {
            if ( err.code == 23505 ) { // Duplicate key value violates unique constraint
                throw new ConflictException( 'username', user_credentials_dto.username );
            }
            throw err;
        } );
    }
}
