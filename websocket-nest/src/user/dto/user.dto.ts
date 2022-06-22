import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
    @ApiProperty()
    @Expose()
        id: string;

    @ApiProperty()
    @Expose()
        username: string;

    constructor ( data: Partial<UserDto> ) {
        Object.assign( this, data );
    }
}
