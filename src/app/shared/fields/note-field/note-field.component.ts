import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextareaAutoresizeDirective } from '../../helpers/textarea-autoresize.directive';

@Component({
  selector: 'app-note-field',
  imports: [TextareaAutoresizeDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoteFieldComponent),
      multi: true
    }
  ],
  templateUrl: './note-field.component.html',
  styleUrl: './note-field.component.scss'
})
export class NoteFieldComponent implements ControlValueAccessor {
  @Input() control?: FormControl;
  @Input() value: string = '';

  //value: string = '';
  isDisabled: boolean = false;

  onChange = (value: any) => { };
  onTouched = () => { };

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


}
