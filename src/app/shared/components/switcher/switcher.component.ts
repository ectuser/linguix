import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Self
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {DestroyService} from "../../../core/services/destroy.service";
import {take, takeUntil} from "rxjs/operators";

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
export class SwitcherComponent implements OnInit, ControlValueAccessor {
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

  ngOnInit(): void {

  }

  toggle(): void {
    this.value = !this.value;
    this.onChange(this.value);
    // this.control.patchValue(!this.value);
  }
}
