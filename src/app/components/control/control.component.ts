import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {SettingsFormService} from "../../core/services/settings-form.service";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  providers: [SettingsFormService]
})
export class ControlComponent {
  catsControl: FormControl;
  dogsControl: FormControl;

  constructor(settingsFormService: SettingsFormService) {
    this.catsControl = settingsFormService.catsControl;
    this.dogsControl = settingsFormService.dogsControl;
  }
}
