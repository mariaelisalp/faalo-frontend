import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navigation/navbar/navbar.component';
import { LargeButtonComponent } from '../../../shared/buttons/large-button/large-button.component';
import { HSDropdown } from 'preline/dist';

@Component({
  selector: 'app-landing-page',
  imports: [NavbarComponent, LargeButtonComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  ngAfterViewInit(){
    HSDropdown.autoInit();
  }
}
