export class DefaultException {
    type: string;
    description: string;
    data?: any;

    constructor ( type: string, description: string, data?: any ) {
        this.type = type;
        this.description = description;
        this.data = data;
    }
}

export class ConflictException extends DefaultException {
    type: 'conflict';
    data: {
        name: string,
        value: any,
    };

    constructor ( field_name: string, field_value: any, description?: string ) {
        super(
            'conflict',
            description || `Conflict of field ${field_name} with value ${field_name}`,
            { name: field_name, value: field_value },
        );
    }
}

export class NotFoundException extends DefaultException {
    type: 'not found';
    data: {
        name: string,
        value: any,
    };

    constructor ( field_name: string, field_value: any, description?: string ) {
        super(
            'not found',
            description || `Field ${field_name} with value ${field_name} was not found`,
            { name: field_name, value: field_value },
        );
    }
}

export type Exception = DefaultException | ConflictException | NotFoundException;
