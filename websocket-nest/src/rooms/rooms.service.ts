import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
    async get_rooms (): Promise<Array<string>> {
        return ['All', 'Admin', 'Secret'];
    }
}
