import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/navigation/sidebar/sidebar.component';
import { NavigationToggleComponent } from '../../shared/buttons/navigation-toggle/navigation-toggle.component';
import { CommonModule } from '@angular/common';
import { HSDropdown, HSOverlay, HSStaticMethods, HSTooltip } from 'preline/dist';

@Component({
  selector: 'app-basic-layout',
  imports: [SidebarComponent, NavigationToggleComponent, CommonModule],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.scss'
})
export class BasicLayoutComponent {

  isSidebarOpen = true

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngAfterViewInit() {
    HSDropdown.autoInit();
    HSOverlay.autoInit()
    HSTooltip.autoInit();
    HSStaticMethods.autoInit();
  }

}
