import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {SettingsFormService} from "../../core/services/settings-form.service";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SettingsFormService]
})
export class ControlComponent implements OnDestroy {
  catsControl = this.settingsFormService.catsControl;
  dogsControl = this.settingsFormService.dogsControl;

  constructor(private settingsFormService: SettingsFormService) {}

  ngOnDestroy() {
    this.settingsFormService.onDestroy();
  }
}
