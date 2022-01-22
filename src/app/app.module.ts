import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ControlComponent } from './components/control/control.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SettingsComponent } from './components/settings/settings.component';
import {SharedModule} from "./shared/shared.module";
import { PostInstallComponent } from './post-install/post-install/post-install.component';
import {PostInstallModule} from "./post-install/post-install.module";

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    PostInstallModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
