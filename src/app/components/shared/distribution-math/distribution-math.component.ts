import { Component, Input, AfterViewInit } from '@angular/core';
import { Distribution } from '../../../models/distribution.model';

declare var MathJax: any;

@Component({
  selector: 'app-distribution-math',
  standalone: true,
  imports: [],
  templateUrl: './distribution-math.component.html'
})
export class DistributionMathComponent implements AfterViewInit {
  @Input() distributionFunction!: Distribution;

  ngAfterViewInit() {
    this.renderMathJax();
  }

  private renderMathJax() {
    if (typeof MathJax !== 'undefined') {
      MathJax.typesetPromise().catch((err: any) => console.error(err));
    } else {
      console.error('MathJax no está definido');
    }
  }
}
