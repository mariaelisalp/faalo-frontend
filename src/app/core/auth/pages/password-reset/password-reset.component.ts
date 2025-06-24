import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputButtonComponent } from '../../../../shared/buttons/input-button/input-button.component';
import { InputFieldComponent } from '../../../../shared/fields/input-field/input-field.component';
import { PasswordReset } from '../../../interfaces/password-reset.interface';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PasswordInputFieldComponent } from '../../../../shared/fields/password-input-field/password-input-field.component';
import { passwordMatchValidator } from '../../../validators/password-match.validator';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  imports: [ReactiveFormsModule, InputButtonComponent, PasswordInputFieldComponent, ErrorMessageComponent, CommonModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  },
  {validators: passwordMatchValidator}
);

  token: string = '';

  constructor(private service: AuthService, private route: ActivatedRoute, private router: Router, private title: Title){}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')!;

    this.title.setTitle('Reset Password');
  }

  resetPassword(){
    const password = this.form.get('password')?.value || '';
    const confirmPassword = this.form.get('confirmPassword')?.value || '';


    if(this.form.invalid){
      return;
    }

    const newPassword: PasswordReset = {
      password: password,
      confirmPassword: confirmPassword
    }

    return this.service.resetPassword(newPassword, this.token).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {

      },
    });
    
  }
}
