import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medium-label',
  imports: [CommonModule],
  templateUrl: './medium-label.component.html',
  styleUrl: './medium-label.component.scss'
})
export class MediumLabelComponent {
  @Input() for: string = '';
}
