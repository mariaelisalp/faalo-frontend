import { Component, ElementRef, ViewChild,} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/navigation/sidebar/sidebar.component';
import { NavigationToggleComponent } from '../../../shared/buttons/navigation-toggle/navigation-toggle.component';
import { InputFieldComponent } from '../../../shared/fields/input-field/input-field.component';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { ThemeToggleComponent } from '../../../shared/buttons/theme-toggle/theme-toggle.component';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { LanguageButtonComponent } from '../../../shared/buttons/language-button/language-button.component';
import { Router, RouterModule } from '@angular/router';
import { LanguageResponse } from '../../interfaces/response/language-response.interface';
import { AuthService } from '../../../core/auth/auth.service';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../interfaces/language.interface';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, BasicLayoutComponent, InputFieldComponent, ThemeToggleComponent, CommonModule, 
    CenterModalComponent, InputButtonComponent, LanguageButtonComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isSidebarOpen = true;
  public languages: LanguageResponse[] = [];
  @ViewChild('hsScaleAnimationModal') modalElement!: ElementRef;

  form = new FormGroup({
    language: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthService, private language: LanguageService, private router: Router){}

  ngOnInit(){
    this.getLanguages();
    
  }

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(){
    return this.auth.logout();
  }

  createLanguage(){

    if(this.form.invalid){
      return;
    }

    const language: Language = {
      name: this.form.get('language')?.value || ''
    }

    return this.language.create(language).subscribe({
      next: () => {
        this.closeModal();
        this.getLanguages();
      },
    });
  }

  closeModal() {
    
  }

  getLanguages(){
    this.language.findMany().subscribe((res) => {
        this.languages =  res.data
      }, 
    )
  }

}
