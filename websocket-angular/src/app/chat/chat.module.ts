import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { WindowComponent } from './window/window.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { MessageCollectionComponent } from './message-collection/message-collection.component';


@NgModule( {
    declarations: [
        MessageComponent,
        WindowComponent,
        SendMessageComponent,
        MessageCollectionComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        WindowComponent,
    ],
} )
export class ChatModule { }
