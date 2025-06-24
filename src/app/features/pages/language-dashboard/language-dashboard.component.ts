import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleButtonComponent } from '../../../shared/buttons/module-button/module-button.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { LanguageResponse } from '../../interfaces/response/language-response.interface';
import { BasicLayoutComponent } from '../../basic-layout/basic-layout.component';
import { HSOverlay, HSStaticMethods } from 'preline/dist';
import { OverflowMenuComponent } from '../../../shared/navigation/overflow-menu/overflow-menu.component';
import { CenterModalComponent } from '../../../shared/modals/center-modal/center-modal.component';
import { DangerButtonComponent } from '../../../shared/buttons/danger-button/danger-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Language } from '../../interfaces/language.interface';
import { InputButtonComponent } from '../../../shared/buttons/input-button/input-button.component';
import { InputFieldComponent } from '../../../shared/fields/input-field/input-field.component';

@Component({
  selector: 'app-language-dashboard',
  imports: [CommonModule, BasicLayoutComponent, ModuleButtonComponent, RouterModule, OverflowMenuComponent, CenterModalComponent,
     DangerButtonComponent, InputButtonComponent, InputFieldComponent, ReactiveFormsModule],
  templateUrl: './language-dashboard.component.html',
  styleUrl: './language-dashboard.component.scss'
})
export class LanguageDashboardComponent {
  isSidebarOpen = true;
  public language!: LanguageResponse;
  languageId: number;

  constructor(private activatedRoute: ActivatedRoute, private service: LanguageService, private router: Router) {
    this.languageId = this.activatedRoute.snapshot.params['languageId'];
  }

  editForm = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit() {

    this.getLanguage(this.languageId);
  }

  ngAfterViewInit(){
    HSStaticMethods.autoInit();
    HSOverlay.autoInit()
  }

  getLanguage(id: number) {
    return this.service.findOne(id).subscribe({
      next: (res) => {
        this.language = res.data;

        this.editForm.patchValue({
          name: res.data.name
        })
      }
    });
  }

  update(){
    if(this.editForm.invalid){
      return;
    }

    const language: Language = {
      name: this.editForm.get('name')?.value || ''
    }

    this.service.update(this.languageId, language).subscribe({
      next: () => {
        this.getLanguage(this.languageId);
      }
    });
  }

  delete(){
    this.service.delete(this.languageId).subscribe({
      next: () => {
        this.router.navigate(['home']);
      }
    })
  }
}
