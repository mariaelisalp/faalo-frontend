import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Login } from '../../../interfaces/login.interface';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/fields/input-field/input-field.component';
import { InputButtonComponent } from '../../../../shared/buttons/input-button/input-button.component';
import { Router, RouterModule } from '@angular/router';
import { FormLabelComponent } from '../../../../shared/labels/form-label/form-label.component';
import { Title } from '@angular/platform-browser';
import { HSStaticMethods } from 'preline/dist';
import { PasswordInputFieldComponent } from '../../../../shared/fields/password-input-field/password-input-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, InputButtonComponent, ReactiveFormsModule, RouterModule, FormLabelComponent, PasswordInputFieldComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit{

  showPassword = false;
  errorMessage: string = '';

  forms = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }
  )
  
  constructor(private service: AuthService, private title: Title, private router: Router){}

  ngAfterViewInit(): void {
    if (typeof HSStaticMethods !== 'undefined') {
      HSStaticMethods.autoInit();
    }
  }

  ngOnInit(){
    this.title.setTitle('Login');
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  login(){
    
    if(this.forms.invalid){
      return;
    }

    const loginDto: Login = {
      email: this.forms.get('email')?.value || '',
      password: this.forms.get('password')?.value || ''
    }

    return this.service.login(loginDto).subscribe(
      {
        next: (res) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      }
    );
  }
}
