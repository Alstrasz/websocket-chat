import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCollectionComponent } from './message-collection.component';

describe( 'MessageCollectionComponent', () => {
    let component: MessageCollectionComponent;
    let fixture: ComponentFixture<MessageCollectionComponent>;

    beforeEach( async () => {
        await TestBed.configureTestingModule( {
            declarations: [MessageCollectionComponent],
        } )
            .compileComponents();
    } );

    beforeEach( () => {
        fixture = TestBed.createComponent( MessageCollectionComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
