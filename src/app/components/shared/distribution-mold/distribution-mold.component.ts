import { Component, HostListener, inject, Input } from '@angular/core';
import { Distribution } from '../../../models/distribution.model';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GetInfoDistributionsService } from '../../../services/get-info-distributions.service';


@Component({
  selector: 'app-distribution-mold',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './distribution-mold.component.html'
})
export class DistributionMoldComponent {
  @Input() distribution!: Distribution;
  isLargeScreen = false;
  private router = inject(Router)

  private getInfoDistributions = inject(GetInfoDistributionsService)
  public infoDistributions: Distribution[] = (this.getInfoDistributions.getDistributions())

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateScreenSize();
  }

  ngOnInit() {
    this.updateScreenSize();
  }

  private updateScreenSize() {
    this.isLargeScreen = window.innerWidth >= 640;
  }


  onSeeDistributionButton(name: string) {
    this.router.navigate([`/distributions/${name}`])
  }
} 
