import { WsMessage } from './ws_message.interface';

export interface OutgoingMessageDto extends WsMessage {
    event: 'message',
    data: {
        Authorization: string,
        author: string;
        message: string;
        room: string,
    },
}
