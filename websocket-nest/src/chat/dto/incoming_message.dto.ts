import { IsNotEmpty, IsString } from 'class-validator';

export class IncomingMessageDto {
    @IsString()
    @IsNotEmpty()
        message: string;

    @IsString()
    @IsNotEmpty()
        room: string;
}
