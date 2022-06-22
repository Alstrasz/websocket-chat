import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDefaultComponent } from './action-default.component';

describe( 'ActionDefaultComponent', () => {
    let component: ActionDefaultComponent;
    let fixture: ComponentFixture<ActionDefaultComponent>;

    beforeEach( async () => {
        await TestBed.configureTestingModule( {
            declarations: [ActionDefaultComponent],
        } )
            .compileComponents();
    } );

    beforeEach( () => {
        fixture = TestBed.createComponent( ActionDefaultComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
