import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { WindowComponent } from './window/window.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { MessageCollectionComponent } from './message-collection/message-collection.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { ActionsComponent } from './actions/actions.component';
import { ActionDeleteRoomComponent } from './action-delete-room/action-delete-room.component';
import { ActionCreateRoomComponent } from './action-create-room/action-create-room.component';
import { ActionDefaultComponent } from './action-default/action-default.component';


@NgModule( {
    declarations: [
        MessageComponent,
        WindowComponent,
        SendMessageComponent,
        MessageCollectionComponent,
        ActionsComponent,
        ActionDeleteRoomComponent,
        ActionCreateRoomComponent,
        ActionDefaultComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthModule,
    ],
    exports: [
        WindowComponent,
    ],
} )
export class ChatModule { }
