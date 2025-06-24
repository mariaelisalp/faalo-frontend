import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-center-modal',
  imports: [ CommonModule],
  templateUrl: './center-modal.component.html',
  styleUrl: './center-modal.component.scss'
})
export class CenterModalComponent {
  @Input() id?: string;
  @Input() title?: string;
  @Input() content?: string;

  @ContentChild('customContent') customContent!: TemplateRef<any>;
  @ContentChild('customFooter') customFooter!: TemplateRef<any>;

}
