import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-cooldown',
  imports: [],
  templateUrl: './cooldown.component.html',
  styleUrl: './cooldown.component.scss'
})
export class CooldownComponent {

  @Input() message: string = '';
  @Input() duration: number = 10;
  @Output() cooldownFinished = new EventEmitter<void>();

  private intervalId?: any;

  ngOnInit() {
    this.startCountdown();
  }

  private startCountdown() {
    this.intervalId = setInterval(() => {
      this.duration--;

      if (this.duration <= 0) {
        clearInterval(this.intervalId);
        this.cooldownFinished.emit(); 
      }
    }, 1000);
  }

  reset() {
    clearInterval(this.intervalId);
    this.startCountdown();
  } 

}
