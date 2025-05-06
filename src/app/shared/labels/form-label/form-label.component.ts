import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-label',
  imports: [],
  templateUrl: './form-label.component.html',
  styleUrl: './form-label.component.scss'
})
export class FormLabelComponent {
  @Input() for: string = '';

}
