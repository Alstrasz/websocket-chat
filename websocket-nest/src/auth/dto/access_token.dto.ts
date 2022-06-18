import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AccessTokenDto {
    @Expose()
        access_token: string;

    constructor ( data: Partial<AccessTokenDto> ) {
        Object.assign( this, data );
    }
}
