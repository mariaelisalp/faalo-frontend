import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input-field',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputFieldComponent),
      multi: true
    }
  ],
  templateUrl: './password-input-field.component.html',
  styleUrl: './password-input-field.component.scss'
})
export class PasswordInputFieldComponent implements ControlValueAccessor{
  @Input() control?: FormControl;
  @Input() type: string = 'password';
  @Input() placeholder?: string;
  @Input() id?: string;
  @Input() name?: string;
  @Input() formControlName!: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  showPassword = false;

  value: string = '';
  isDisabled: boolean = false;

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
    this.isDisabled = isDisabled;
  }

  changeInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  togglePassword(input: HTMLInputElement): void {
    this.showPassword = !this.showPassword;
    input.type = this.showPassword ? 'text' : 'password';
  }

  
}
