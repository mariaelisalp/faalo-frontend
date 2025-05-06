import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-button',
  imports: [],
  templateUrl: './input-button.component.html',
  styleUrl: './input-button.component.scss'
})
export class InputButtonComponent {
  @Input() disabled: boolean = false;
  @Input() name: string = '';
  @Input() type: string = 'submit';
}
