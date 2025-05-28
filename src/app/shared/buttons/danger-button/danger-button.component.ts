import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-danger-button',
  imports: [],
  templateUrl: './danger-button.component.html',
  styleUrl: './danger-button.component.scss'
})
export class DangerButtonComponent {
  @Input() disabled: boolean = false;
  @Input() name: string = '';
  @Input() type: string = 'submit';

  @Output() onClick = new EventEmitter();

}
