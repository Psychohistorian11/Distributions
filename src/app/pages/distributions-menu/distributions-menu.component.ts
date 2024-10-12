import { Component } from '@angular/core';
import { DistributionMoldComponent } from '../../components/shared/distribution-mold/distribution-mold.component';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-distributions-menu',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './distributions-menu.component.html'
})
export class DistributionsMenuComponent {

}
