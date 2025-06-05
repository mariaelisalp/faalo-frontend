import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-card',
  imports: [],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {

  @Input() imageSrc: string = '';
  @Input() title: string = '';

}
