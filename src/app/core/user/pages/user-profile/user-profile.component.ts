import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/fields/input-field/input-field.component';
import { InputButtonComponent } from '../../../../shared/buttons/input-button/input-button.component';
import { FormLabelComponent } from '../../../../shared/labels/form-label/form-label.component';
import { DangerButtonComponent } from '../../../../shared/buttons/danger-button/danger-button.component';
import { PasswordInputFieldComponent } from '../../../../shared/fields/password-input-field/password-input-field.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../auth/validators/password-match.validator';
import { TokenService } from '../../../auth/token.service';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../../interfaces/response/user-response.interface';
import { UserEdit } from '../../../interfaces/user-edit.interface';
import { PasswordEdit } from '../../../interfaces/password-edit.interface';
import { CenterModalComponent } from '../../../../shared/modals/center-modal/center-modal.component';
import { HSOverlay } from 'preline/dist';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, InputFieldComponent, InputButtonComponent, FormLabelComponent, DangerButtonComponent, PasswordInputFieldComponent,
    ReactiveFormsModule, CenterModalComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  user: UserResponse = {
    name: '',
    email: '',
    profileImage: '',
    isVerified: false,
    createdAt: '',
    updatedAt: ''
  };

  isDarkMode = false;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router, private token: TokenService, private auth: AuthService) { }

  ngOnInit() {
    this.getUser();

    const savedTheme = localStorage.getItem('hs_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.isDarkMode =
      savedTheme === 'dark' ||
      (savedTheme === 'auto' && prefersDark) ||
      (!savedTheme && prefersDark);

    this.applyTheme();
  }

  ngAfterViewInit() {
    HSOverlay.autoInit();
  }

  form = new FormGroup({
    name: new FormControl('', Validators.maxLength(255)),
    email: new FormControl('', Validators.email)
  })

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  },
    { validators: passwordMatchValidator }
  )

  getUser() {
    this.userService.findByEmail().subscribe({
      next: (res) => {
        this.user = res.data;

        this.form.patchValue({
          name: this.user.name,
          email: this.user.email
        })
      }
    })

  }

  updateUser() {

    const userUpdated: UserEdit = {
      name: this.form.get('name')?.value || '',
      email: this.form.get('email')?.value || '',
    }

    this.userService.update(userUpdated).subscribe({
      next: (res) => {
        console.log('chegou aquiii')
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });

  }

  updatePassword() {
    const password: PasswordEdit = {
      password: this.passwordForm.get('oldPassword')?.value || '',
      newPassword: this.passwordForm.get('password')?.value || ''
    }

    this.userService.updatePassword(password).subscribe({
      error: (err) => {
        this.errorMessage = err.message;
      }
    })
  }

  deleteUser() {
    this.userService.delete().subscribe({
      next: () => {
        this.token.removeToken();
        this.router.navigate(['/']);
      }
    })
  }

  signOut() {
    this.auth.logout();
    localStorage.clear();
    this.router.navigate(['/']);
  }


  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    localStorage.setItem('hs_theme', this.isDarkMode ? 'dark' : 'light');

    this.applyTheme();
  }

  private applyTheme(): void {
    const html = document.querySelector('html');
    if (!html) return;

    if (this.isDarkMode) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }
  }

}
