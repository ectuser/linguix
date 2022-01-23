import {
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitcherComponent),
      multi: true
    }
  ]
})
export class SwitcherComponent implements ControlValueAccessor {
  @Input() size: 's' | 'm' = 's';

  value = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  get classList(): Record<string, boolean> {
    const size = `toggle__button_${this.size}`;
    return {
      'toggle__button_on': this.value,
      [size]: true
    }
  }

  writeValue(value: boolean): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggle(): void {
    this.value = !this.value;
    this.onChange(this.value);
  }
}
