import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-right-offcanvas',
  imports: [CommonModule],
  templateUrl: './right-offcanvas.component.html',
  styleUrl: './right-offcanvas.component.scss'
})
export class RightOffcanvasComponent {

  @Input() offcanvasId: string = 'hs-offcanvas-right'; 
  @Input() title: string = 'Título';

  @ContentChild('customContent') customContent!: TemplateRef<any>;



}
