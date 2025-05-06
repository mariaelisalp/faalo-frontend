import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private service: AuthService){}

  logout(){
    console.log('vamos saindo')
    return this.service.logout();
  }

}
