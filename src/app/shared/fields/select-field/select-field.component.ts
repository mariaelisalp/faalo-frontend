import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true
    }
  ],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss'
})
export class SelectFieldComponent implements ControlValueAccessor{
  //@Input() options: SelectOption[] = [];
  @Input() disabled: boolean = false;

  @Output() selectionChange = new EventEmitter<any>();
  //@Output() optionSelected = new EventEmitter<SelectOption>();

  private onChange = (value: any) => {};
  private onTouched = () => {};

  value: any = '';

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event: any) {
    const selectedValue = event.target.value;
    this.value = selectedValue;
    
    this.onChange(selectedValue);
    this.onTouched();
    
    this.selectionChange.emit(selectedValue);
    
    /*const selectedOption = this.options.find(opt => opt.value === selectedValue);
    if (selectedOption) {
      this.optionSelected.emit(selectedOption);
    }*/
  }
}


