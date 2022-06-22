import { InternalServerErrorException } from '@nestjs/common';
import * as nestjs from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultException {
    @ApiProperty()
        type: string;
    @ApiProperty()
        description: string;
    @ApiProperty( { required: false } )
        data?: any;

    constructor ( type: string, description: string, data?: any ) {
        this.type = type;
        this.description = description;
        this.data = data;
    }
}

export class ConflictException extends DefaultException {
    @ApiProperty()
        type: ExceptionTypes.CONFLICT;
    @ApiProperty()
        data: {
            name: string,
            value: any,
        };

    constructor ( field_name: string, field_value: any, description?: string ) {
        super(
            ExceptionTypes.CONFLICT,
            description || `Conflict of field ${field_name} with value ${field_value}`,
            { name: field_name, value: field_value },
        );
    }
}

export class NotFoundException extends DefaultException {
    @ApiProperty()
        type: ExceptionTypes.NOT_FOUND;
    @ApiProperty()
        data: {
            name: string,
            value: any,
        };

    constructor ( field_name: string, field_value: any, description?: string ) {
        super(
            ExceptionTypes.NOT_FOUND,
            description || `Field ${field_name} with value ${field_value} was not found`,
            { name: field_name, value: field_value },
        );
    }
}

export class InvalidRequestException extends DefaultException {
    @ApiProperty()
        type: ExceptionTypes.INVALID_REQUEST;
    @ApiProperty()
        data: {
            name: string,
            value: any,
        };

    constructor ( field_name: string, field_value: any, description?: string ) {
        super(
            'not found',
            description || `Field ${field_name} with value ${field_value} does not follow requierments`,
            { name: field_name, value: field_value },
        );
    }
}

export type Exception = DefaultException | ConflictException | NotFoundException;

export enum ExceptionTypes {
    NOT_FOUND = 'not_found',
    CONFLICT = 'conflict',
    INVALID_REQUEST = 'invalid_request',
}

export function default_exception_handler ( err ) {
    if ( !err.type ) {
        throw new InternalServerErrorException( err );
    }
    switch ( err.type ) {
    case ExceptionTypes.NOT_FOUND:
        throw new nestjs.NotFoundException( err );
        break;
    case ExceptionTypes.CONFLICT:
        throw new nestjs.ConflictException( err );
        break;
    case ExceptionTypes.INVALID_REQUEST:
        throw new nestjs.BadRequestException( err );
        break;
    default:
        throw new InternalServerErrorException( err );
    }
}
