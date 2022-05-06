import { IsNotEmpty, IsString } from 'class-validator';

export class IncomingMessageDto {
    @IsString()
    @IsNotEmpty()
        author: string;

    @IsString()
    @IsNotEmpty()
        message: string;
}
