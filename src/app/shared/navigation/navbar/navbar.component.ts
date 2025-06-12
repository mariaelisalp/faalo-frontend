import { Component } from '@angular/core';
import { TokenService } from '../../../core/auth/token.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/user/services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  signedIn = false;
  userName: string = '';

  constructor(private token: TokenService, private user: UserService){}

  ngOnInit(){
    this.isSignedIn();

    this.user.findByEmail().subscribe(
      (res) => {
        this.userName = res.data.name;
      }
    )
  }

  isSignedIn(){

    if(this.token.getToken()){
      this.signedIn = true;
    }
    else{
      this.signedIn = false;
    }
  }
}
