export class OutgoingErrorDto {
    data: OutgoingErrorData;
    event: 'error';

    constructor ( data: OutgoingErrorData ) {
        this.data = data;
        this.event = 'error';
    }
}

interface OutgoingErrorData {
    status: number,
    description: string
}
