import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rounded-button',
  imports: [CommonModule],
  templateUrl: './rounded-button.component.html',
  styleUrl: './rounded-button.component.scss'
})
export class RoundedButtonComponent {
  @Output() onClick = new EventEmitter();

  @Input() disabled: boolean = false;
  @Input() type: string = 'submit';
}
