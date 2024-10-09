import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DistributionGraphComponent } from "../../components/distributions/distribution-graph/distribution-graph.component";
import { DistributionInputsComponent } from "../../components/distributions/distribution-inputs/distribution-inputs.component";
import { DistributionContentComponent } from "../../components/distributions/distribution-content/distribution-content.component";

@Component({
  selector: 'app-distribution-page',
  standalone: true,
  imports: [DistributionGraphComponent, DistributionInputsComponent, DistributionContentComponent],
  templateUrl: './distribution-page.component.html'
})
export class DistributionPageComponent implements OnInit {

  private route = inject(ActivatedRoute)
  public distributionName = ''

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.distributionName = params['input'];
    });

  }
}
