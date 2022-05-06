import { WsMessage } from './ws_message.interface';

export interface OutgoingMessageDto extends WsMessage {
    data: {
        author: string;
        message: string;
    }
    event: 'message';
}
