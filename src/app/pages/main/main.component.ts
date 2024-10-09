import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html'
})
export class MainComponent {

  private router = inject(Router)

  onStartButton(event: Event) {
    event.preventDefault();
    this.router.navigate([`/distributions`]);
  }


}
