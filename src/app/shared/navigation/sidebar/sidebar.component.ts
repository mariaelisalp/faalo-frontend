import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeToggleComponent } from '../../buttons/theme-toggle/theme-toggle.component';
import { CommonModule } from '@angular/common';
import { NavigationToggleComponent } from '../../buttons/navigation-toggle/navigation-toggle.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [ThemeToggleComponent, CommonModule, NavigationToggleComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isSidebarOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private auth: AuthService, private router: Router){}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
