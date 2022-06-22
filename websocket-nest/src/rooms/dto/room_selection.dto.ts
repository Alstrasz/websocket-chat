import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoomSelectionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
        name: string;
}
