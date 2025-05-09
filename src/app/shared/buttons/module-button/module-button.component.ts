import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-module-button',
  imports: [CommonModule],
  templateUrl: './module-button.component.html',
  styleUrl: './module-button.component.scss'
})
export class ModuleButtonComponent {

  @Input() isOpen: boolean = true;
}
