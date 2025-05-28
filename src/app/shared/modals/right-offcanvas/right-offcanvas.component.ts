import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-right-offcanvas',
  imports: [CommonModule],
  templateUrl: './right-offcanvas.component.html',
  styleUrl: './right-offcanvas.component.scss'
})
export class RightOffcanvasComponent {

  @Input() title: string = '';
  @Input() id?: string;

  @ContentChild('customContent') customContent!: TemplateRef<any>;



}
