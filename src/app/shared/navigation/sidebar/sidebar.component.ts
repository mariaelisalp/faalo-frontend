import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeToggleComponent } from '../../buttons/theme-toggle/theme-toggle.component';
import { CommonModule } from '@angular/common';
import { NavigationToggleComponent } from '../../buttons/navigation-toggle/navigation-toggle.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { TokenService } from '../../../core/auth/token.service';
import { UserService } from '../../../core/user/services/user.service';

@Component({
  selector: 'app-sidebar',
  imports: [ThemeToggleComponent, CommonModule, NavigationToggleComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isSidebarOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();


  public userName: string = '';

  constructor(private auth: AuthService, private router: Router, private token: TokenService, private user: UserService) { }

  ngOnInit() {
    const token = this.token.decodeToken();

    this.user.findByEmail().subscribe(
      (res) => {
        this.userName = res.data.name;
      }
    )
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    this.auth.logout();
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
