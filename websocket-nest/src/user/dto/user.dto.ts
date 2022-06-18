import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
    @Expose()
        id: string;

    @Expose()
        username: string;

    constructor ( data: Partial<UserDto> ) {
        Object.assign( this, data );
    }
}