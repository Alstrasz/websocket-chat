import { IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDto {
    @IsString()
    @IsNotEmpty()
        username: string;

    @IsString()
    @IsNotEmpty()
        password: string;

    constructor ( data: UserCredentialsDto ) {
        Object.assign( this, data );
    }
}
