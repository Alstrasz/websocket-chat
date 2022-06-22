export class GroupModificationDto {
    data: GroupModificationData;
    event: 'group';

    constructor ( data: GroupModificationData ) {
        this.data = data;
        this.event = 'group';
    }
}

interface GroupModificationData {
    action: 'created' | 'deleted',
    name: string,
}
