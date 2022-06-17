import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { WindowComponent } from './window/window.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { MessageCollectionComponent } from './message-collection/message-collection.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';


@NgModule( {
    declarations: [
        MessageComponent,
        WindowComponent,
        SendMessageComponent,
        MessageCollectionComponent,
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
