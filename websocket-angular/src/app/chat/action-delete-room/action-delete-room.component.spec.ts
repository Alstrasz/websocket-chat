import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDeleteRoomComponent } from './action-delete-room.component';

describe( 'ActionDeleteRoomComponent', () => {
    let component: ActionDeleteRoomComponent;
    let fixture: ComponentFixture<ActionDeleteRoomComponent>;

    beforeEach( async () => {
        await TestBed.configureTestingModule( {
            declarations: [ActionDeleteRoomComponent],
        } )
            .compileComponents();
    } );

    beforeEach( () => {
        fixture = TestBed.createComponent( ActionDeleteRoomComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
