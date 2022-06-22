import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCredentialsDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength( 16 )
    @MinLength( 4 )
        username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength( 32 )
    @MinLength( 6 )
        password: string;

    constructor ( data: UserCredentialsDto ) {
        Object.assign( this, data );
    }
}
