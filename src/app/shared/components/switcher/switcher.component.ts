import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent {
  @Input() switchControl?: FormControl;

  get value(): boolean {
    return this.switchControl?.value;
  }

  toggle(): void {
    if (this.switchControl) {
      this.switchControl?.patchValue(!this.value);
    }
  }
}
