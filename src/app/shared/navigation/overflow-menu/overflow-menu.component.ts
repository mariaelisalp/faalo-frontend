import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-overflow-menu',
  imports: [CommonModule],
  templateUrl: './overflow-menu.component.html',
  styleUrl: './overflow-menu.component.scss'
})
export class OverflowMenuComponent {
  @Input() id?: string;

  @ContentChild('customContent') customContent!: TemplateRef<any>;

}
