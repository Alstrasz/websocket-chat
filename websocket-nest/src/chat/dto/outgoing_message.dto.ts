export class OutgoingMessageDto {
    data: OutgoingMessageData;
    event: 'message';

    constructor ( data: OutgoingMessageData ) {
        this.data = data;
        this.event = 'message';
    }
}

interface OutgoingMessageData {
    author: string;
    message: string;
    timestamp: number;
    room: string;
}
