import { Component} from '@angular/core';
import { InputFieldComponent } from '../../../../shared/fields/input-field/input-field.component';
import { InputButtonComponent } from '../../../../shared/buttons/input-button/input-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { HSOverlay } from 'preline/dist';
import { CenterModalComponent } from '../../../../shared/modals/center-modal/center-modal.component';

@Component({
  selector: 'app-password-reset-email',
  imports: [InputFieldComponent, InputButtonComponent, ReactiveFormsModule, CommonModule, ErrorMessageComponent, 
    CenterModalComponent],
  templateUrl: './password-reset-email.component.html',
  styleUrl: './password-reset-email.component.scss'
})
export class PasswordResetEmailComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  sent = false;
  errorMessage: string = '';

  constructor(private service: AuthService, private title: Title,){}

  ngOnInit(){
    this.title.setTitle('Forgot my password');
  }

  ngAfterViewInit(){
    HSOverlay.autoInit();
  }

  sendEmail(){
    if(this.form.invalid){
      return;
    }

    const email: {email: string} = {
      email: this.form.get('email')?.value || ''
    }

    return this.service.sendResetPasswordEmail(email).subscribe({
      next: () => {
        this.sent = true;
      },
      error: (err) => {
        if(err.status == 404){
          this.errorMessage = err.message;
        }
      }
    });
  }

}
