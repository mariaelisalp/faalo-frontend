import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-medium-modal',
  imports: [CommonModule],
  templateUrl: './medium-modal.component.html',
  styleUrl: './medium-modal.component.scss'
})
export class MediumModalComponent {
  @Input() id?: string;
  @Input() title?: string;
  @Input() content?: string;

  @ContentChild('customContent') customContent!: TemplateRef<any>;
  @ContentChild('customFooter') customFooter!: TemplateRef<any>;
}
