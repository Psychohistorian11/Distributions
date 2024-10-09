import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-distribution-content',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './distribution-content.component.html'
})
export class DistributionContentComponent {

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
