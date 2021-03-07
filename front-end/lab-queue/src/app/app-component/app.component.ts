import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lab-queue';

  cards = [];

  public createQueue(): void {
    console.log('btn create queue clicked');
    this.cards.push('card');
  }
}
