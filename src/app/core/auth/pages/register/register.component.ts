import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from '../../../interfaces/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecondInputFieldComponent } from '../../../../shared/fields/second-input-field/second-input-field.component';
import { FormLabelComponent } from '../../../../shared/labels/form-label/form-label.component';
import { InputButtonComponent } from '../../../../shared/buttons/input-button/input-button.component';
import { UploadProfilePhotoComponent } from '../../../../shared/file/upload-profile-photo/upload-profile-photo.component';
import { Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PasswordInputFieldComponent } from '../../../../shared/fields/password-input-field/password-input-field.component';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { SpinnerComponent } from '../../../../shared/elements/spinner/spinner.component';
import { NavigationService } from '../../navigation.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, SecondInputFieldComponent, FormLabelComponent, InputButtonComponent, 
    UploadProfilePhotoComponent, RouterModule, PasswordInputFieldComponent, CommonModule, SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
  forms = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required],),
      profileImage: new FormControl(),
    },
    {validators: passwordMatchValidator}
  )

  sent = false;
  errorMessage: string = '';

  constructor(private service: AuthService, private title: Title, private router: Router, private navigation: NavigationService) {}

  ngOnInit(){
    this.title.setTitle('Register');
  }

  create() {
    this.sent = true;

    if(this.forms.invalid){
      this.sent = false;
      return;
    }

    const user : User = {
      name: this.forms.get('name')?.value || '',
      email: this.forms.get('email')?.value || '',
      password: this.forms.get('password')?.value || '',
      confirmPassword: this.forms.get('confirmPassword')?.value || '',
      profileImage: this.forms.get('profileImage')?.value || ''
    }

    console.log(user)
    
    return this.service.create(user).subscribe(
      {
        next: (res) => {
          this.navigation.setRedirected(true);
          this.router.navigate(['/email-verification']);
        },
        error: (err) => {
          this.sent = false
          this.errorMessage = err.message;
        }
      }
    );
  }
}
