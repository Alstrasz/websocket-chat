import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCreateRoomComponent } from './action-create-room.component';

describe( 'ActionCreateRoomComponent', () => {
    let component: ActionCreateRoomComponent;
    let fixture: ComponentFixture<ActionCreateRoomComponent>;

    beforeEach( async () => {
        await TestBed.configureTestingModule( {
            declarations: [ActionCreateRoomComponent],
        } )
            .compileComponents();
    } );

    beforeEach( () => {
        fixture = TestBed.createComponent( ActionCreateRoomComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
