import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitcherComponent {
  @Input() switchControl?: FormControl;
  @Input() size: 's' | 'm' = 's';

  get value(): boolean {
    return this.switchControl?.value;
  }

  get classList(): Record<string, boolean> {
    const size = `toggle__button_${this.size}`;
    return {
      'toggle__button_on': this.value,
      [size]: true
    }
  }

  toggle(): void {
    if (this.switchControl) {
      this.switchControl?.patchValue(!this.value);
    }
  }
}
