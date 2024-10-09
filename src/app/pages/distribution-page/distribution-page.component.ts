import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-distribution-page',
  standalone: true,
  imports: [],
  templateUrl: './distribution-page.component.html'
})
export class DistributionPageComponent implements OnInit {

  private route = inject(ActivatedRoute)
  public distributionName = ''

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.distributionName = params['distribution'];
      console.log(this.distributionName)
    });

  }
}
