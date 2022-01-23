import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsFormService} from "../../core/services/settings-form.service";

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
  providers: [SettingsFormService]
})
export class AppSettingsComponent implements OnDestroy {
  catsControl = this.settingsFormService.catsControl;
  dogsControl = this.settingsFormService.dogsControl;

  constructor(private settingsFormService: SettingsFormService) {}

  ngOnDestroy() {
    this.settingsFormService.onDestroy();
  }
}
