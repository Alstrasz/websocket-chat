import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength( 16 )
    @MinLength( 4 )
        username: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength( 32 )
    @MinLength( 6 )
        password: string;

    constructor ( data: UserCredentialsDto ) {
        Object.assign( this, data );
    }
}
