import { JwtPayload } from './jwt_payload.interface';

export type WsWithCredentials<T> = T & { Authorization: JwtPayload };
