import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { HSOverlay } from 'preline/dist';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() id?: string;
  @Input() title?: string;
  @Input() content?: string;

  @ContentChild('customContent') customContent!: TemplateRef<any>;
  @ContentChild('customFooter') customFooter!: TemplateRef<any>;

  ngOnInit(){
    HSOverlay.autoInit();
  }

  
}
