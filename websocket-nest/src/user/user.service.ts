import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac, randomBytes } from 'crypto';
import { Exception, NotFoundException } from 'src/exception.interface';
import { Repository } from 'typeorm';
import { UserCredentialsDto } from './dto/user_credentials.dto';
import { User } from './user.entity';

const DEFAULT_USERS = [
    { username: 'Admin', password: 'a', salt: '1' },
];

@Injectable()
export class UserService {
    constructor (
        @InjectRepository( User )
        private roomsRepository: Repository<User>,
    ) {
        for ( const user of DEFAULT_USERS ) {
            this.create_user( user ).catch( ( ) => {} );
        }
    }

    async get_by_username ( username: string ): Promise<User> {
        const res = await this.roomsRepository.findOne( { where: { username } } );
        if ( res == null ) {
            throw new NotFoundException( 'username', username );
        }
        return res;
    }

    async create_user ( user_credentials_dto: UserCredentialsDto ) {
        const { hash, salt } = this.sha512(
            user_credentials_dto.password,
            randomBytes( 16 ).toString().slice( 0, 16 ),
        );
        const user_data: Partial<User> = {
            username: user_credentials_dto.username,
            password: hash,
            salt: salt,
        };
        const user = this.roomsRepository.create( user_data );
        return this.roomsRepository.insert( user );
    }

    async validate_user ( user_credentials_dto: UserCredentialsDto ): Promise<boolean> {
        return this.get_by_username( user_credentials_dto.username )
            .then( ( user: User ) => {
                return this.validate_password( user_credentials_dto.password, user.password, user.salt );
            } )
            .catch( ( err: Exception ) => {
                if ( err.type == 'not_found' ) {
                    return false;
                }
            } );
    }

    private sha512 ( password: string, salt: string ) {
        const hash = createHmac( 'sha512', salt );
        hash.update( password );
        return { salt, hash: hash.digest().toString() };
    }

    private validate_password ( password: string, hash: string, salt: string ) {
        return hash === this.sha512( password, salt ).hash;
    }
}
