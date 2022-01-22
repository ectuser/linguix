import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostInstallComponent } from './post-install/post-install.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    PostInstallComponent,
    AppSettingsComponent
  ],
  exports: [
    PostInstallComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PostInstallModule { }
