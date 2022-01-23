import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Self} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DestroyService} from "../../core/services/destroy.service";
import {debounceTime, distinctUntilChanged, filter, take, takeUntil} from "rxjs/operators";
import {Observable} from "rxjs";
import {changeTimeout} from "../../shared/consts/consts";
import {StorageService} from "../../core/services/storage.service";
import {ExtensionEnabledService} from "../../core/services/extension-enabled.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class SettingsComponent implements OnInit {
  readonly extensionControl = new FormControl();

  private get valueChanged(): Observable<boolean> {
    return this.extensionControl.valueChanges.pipe(
      filter((value) => value !== undefined),
      distinctUntilChanged((a, b) => a === b),
      debounceTime(changeTimeout)
    );
  }

  constructor(
    @Self() private destroy$: DestroyService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef,
    private extensionEnabledService: ExtensionEnabledService,
  ) {}

  ngOnInit(): void {
    this.extensionEnabledService.extensionEnabled$.pipe(take(1)).subscribe((value) => {
      this.extensionControl.patchValue(value, {emitEvent: false});
      this.cdr.detectChanges();
    })

    this.valueChanged.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.extensionEnabledService.setExtensionEnabledSubject(value);
    });
  }
}
