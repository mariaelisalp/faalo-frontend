import { Component, ViewChild } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/fields/input-field/input-field.component';
import { InputButtonComponent } from '../../../../shared/buttons/input-button/input-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../../shared/modals/modal/modal.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';

@Component({
  selector: 'app-password-reset-email',
  imports: [InputFieldComponent, InputButtonComponent, ReactiveFormsModule, CommonModule, ModalComponent, ErrorMessageComponent],
  templateUrl: './password-reset-email.component.html',
  styleUrl: './password-reset-email.component.scss'
})
export class PasswordResetEmailComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  sent = false;
  errorMessage: string = '';
  @ViewChild(ModalComponent) modal!: ModalComponent

  constructor(private service: AuthService, private title: Title,){}

  ngOnInit(){
    this.title.setTitle('Forgot my password');
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
        this.modal.open();
      },
      error: (err) => {
        if(err.status == 404){
          this.errorMessage = err.message;
        }
      }
    });
  }

}
