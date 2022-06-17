import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WindowComponent } from './window/window.component';
import { ControlsComponent } from './controls/controls.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { FormsModule } from '@angular/forms';


@NgModule( {
    declarations: [
        LoginComponent,
        RegisterComponent,
        WindowComponent,
        ControlsComponent,
        CredentialsComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
    ],
    exports: [
        WindowComponent,
    ],
} )
export class AuthModule { }
