import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Login } from '../../../interfaces/login.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/fields/input-field/input-field.component';
import { InputButtonComponent } from '../../../../shared/buttons/input-button/input-button.component';
import { Router, RouterModule } from '@angular/router';
import { FormLabelComponent } from '../../../../shared/labels/form-label/form-label.component';
import { Title } from '@angular/platform-browser';
import { HSStaticMethods } from 'preline/dist';
import { PasswordInputFieldComponent } from '../../../../shared/fields/password-input-field/password-input-field.component';
import { TypeWriterService } from '../../../../features/services/type-writer.service';
import { map, Observable } from 'rxjs';
import { SpinnerComponent } from '../../../../shared/elements/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, InputButtonComponent, ReactiveFormsModule, RouterModule, FormLabelComponent, PasswordInputFieldComponent,
     CommonModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {

  showPassword = false;
  errorMessage: string = '';
  sent = false;
  slogan: string = "One language at a time, in your way"
  typed$!: Observable<String>;

  forms = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  }
  )

  constructor(private service: AuthService, private title: Title, private router: Router, private typeWriter: TypeWriterService) { }

  ngAfterViewInit(): void {
    if (typeof HSStaticMethods !== 'undefined') {
      HSStaticMethods.autoInit();
    }
  }

  ngOnInit() {
    this.title.setTitle('Login');
    this.sloganTyping();
  }

  sloganTyping() {
    this.typed$ = this.typeWriter

      .getTypewriterEffect(['One language at a time...', '...in your way.'])
      .pipe(map((text) => text));
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {

    this.sent = true;

    if (this.forms.invalid) {
      this.sent = false;
      return;
    }

    const loginDto: Login = {
      email: this.forms.get('email')?.value || '',
      password: this.forms.get('password')?.value || ''
    }

    return this.service.login(loginDto).subscribe(
      {
        next: (res) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.sent = false
          this.errorMessage = err.message;
        }
      }
    );
  }
}
