import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GetInfoDistributionsService } from '../../../services/get-info-distributions.service';
import { ActivatedRoute } from '@angular/router';
import { Distribution } from '../../../models/distribution.model';
import { DistributionMathComponent } from "../../shared/distribution-math/distribution-math.component";


@Component({
  selector: 'app-distribution-content',
  standalone: true,
  imports: [NgClass, NgIf, DistributionMathComponent],
  templateUrl: './distribution-content.component.html'
})
export class DistributionContentComponent implements OnInit {
  isOpen = false;
  distributionName: string = '';
  distribution: Distribution | null = null;
  selectedSection: string = 'definition';


  private getInfoDistribution = inject(GetInfoDistributionsService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.distributionName = params['input'];
    });
    this.distribution = this.getInfoDistribution.getDistributionByName(this.distributionName);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  showSection(section: string) {
    this.selectedSection = section;
  }


}
