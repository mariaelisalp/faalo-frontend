import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  imports: [CommonModule],
  templateUrl: './secondary-button.component.html',
  styleUrl: './secondary-button.component.scss'
})
export class SecondaryButtonComponent {
  @Output() onClick = new EventEmitter();
  @HostBinding('class') hostClass = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'submit';
}
