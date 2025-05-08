import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-toggle',
  imports: [CommonModule],
  templateUrl: './navigation-toggle.component.html',
  styleUrl: './navigation-toggle.component.scss'
})
export class NavigationToggleComponent {
  @Input() isOpen: boolean = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggle() {
    this.toggleSidebar.emit();
  }
}
