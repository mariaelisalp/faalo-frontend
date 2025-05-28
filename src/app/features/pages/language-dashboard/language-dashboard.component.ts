import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../../../shared/navigation/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { NavigationToggleComponent } from '../../../shared/buttons/navigation-toggle/navigation-toggle.component';
import { ModuleButtonComponent } from '../../../shared/buttons/module-button/module-button.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { LanguageResponse } from '../../interfaces/response/language-response.interface';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';

@Component({
  selector: 'app-language-dashboard',
  imports: [CommonModule, BasicLayoutComponent, ModuleButtonComponent, RouterModule],
  templateUrl: './language-dashboard.component.html',
  styleUrl: './language-dashboard.component.scss'
})
export class LanguageDashboardComponent {
  isSidebarOpen = true;
  public language!: LanguageResponse;

  constructor(private activatedRoute: ActivatedRoute, private service: LanguageService){}


  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(){
    const languageId = this.activatedRoute.snapshot.params['languageId'];
    console.log(languageId)

    this.getLanguage(languageId);
  }

  getLanguage(id: number){
    return this.service.findOne(id).subscribe({
      next: (res) => {
        this.language = res.data;
        console.log(this.language);
      }
    });
  }
}
