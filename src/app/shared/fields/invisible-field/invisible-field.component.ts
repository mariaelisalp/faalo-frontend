import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-invisible-field',
  imports: [ReactiveFormsModule],
  templateUrl: './invisible-field.component.html',
  styleUrl: './invisible-field.component.scss'
})
export class InvisibleFieldComponent implements ControlValueAccessor {
  @Input() control?: FormControl;
  @Input() type: string = 'text';
  @Input() id?: string;
  @Input() formControlName!: string;
  @Input() disabled: boolean = false;

  value: string = '';

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  changeInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

}
