import { Component, ViewChild } from '@angular/core';
import { PinInputComponent } from '../../../../shared/pin-input/pin-input.component';
import { InputButtonComponent } from '../../../../shared/buttons/input-button/input-button.component';
import { InputFieldComponent } from '../../../../shared/fields/input-field/input-field.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterModule } from '@angular/router';
import { VerificationCode } from '../../../interfaces/verification-code.interface';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { CooldownComponent } from '../../../../shared/elements/cooldown/cooldown.component';

@Component({
  selector: 'app-email-verification',
  imports: [InputButtonComponent, InputFieldComponent, RouterModule, ReactiveFormsModule, CommonModule, CooldownComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss'
})
export class EmailVerificationComponent {

  form = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  errorMessage: string = '';
  verified = false;
  countdownFinished = false;
  @ViewChild(CooldownComponent) cooldownComponent!: CooldownComponent;

  constructor(private service: AuthService, private router: Router) { }

  sendCode() {

    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }

    const code: VerificationCode = {
      value: this.form.get('code')?.value || ''
    }

    return this.service.sendVerificationCode(code).subscribe({
      next: (res) => {

        this.verified = true;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      },
      error: (err) => {
 
        this.errorMessage = err.message;
      },
    })

  }

  onCountDownFinished() {
    this.countdownFinished = true;
  }

  resendCode() {
    this.service.resendVerficationEmail().subscribe(() => {
      this.countdownFinished = false;
      this.cooldownComponent.reset();
    });
  }

}
