import { nanoid } from 'nanoid';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn( { type: 'varchar', length: 10, unique: true, update: false } )
        id = nanoid( 10 );

    @Column( { unique: true, length: 16 } )
        username: string;

    @Column()
        password: string;

    @Column( { type: 'varchar', length: 16 } )
        salt: string;
}
