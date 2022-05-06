export class OutgoingMessageDto {
    data: {
        author: string;
        message: string;
        timestamp: number;
    };
    event: string;

    constructor ( data: OutgoingMessageData ) {
        this.data = data;
        this.event = 'message';
    }
}

interface OutgoingMessageData {
    author: string;
    message: string;
    timestamp: number;
}
