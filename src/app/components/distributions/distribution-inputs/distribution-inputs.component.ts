import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Distribution } from '../../../models/distribution.model';
import { GetInfoDistributionsService } from '../../../services/get-info-distributions.service';
import { DistributionService } from '../../../services/distribution.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-distribution-inputs',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './distribution-inputs.component.html',
})
export class DistributionInputsComponent implements OnInit {
  public distributionName = '';
  public distribution: Distribution | null = null;
  public parameters: { [key: string]: number } = {};
  public parametersEntries: { key: string, value: string }[] = [];
  yValue: number = 0;
  interval: string = ''

  private route = inject(ActivatedRoute);
  private getInfoDistributionsService = inject(GetInfoDistributionsService);
  private distributionService = inject(DistributionService);

  constructor() {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.distributionName = params['input'];
      this.distribution = this.getInfoDistributionsService.getDistributionByName(this.distributionName);
      this.interval = Object.values(this.distribution!.intervals)[0];


      if (this.distribution) {
        this.parameters = Object.fromEntries(
          Object.keys(this.distribution.parameters).map(key => [key, 0])
        );
        this.parametersEntries = this.getParameterEntries(this.distribution.parameters);
      }

    });
  }

  onInputChange(event: Event, key: string): void {
    const inputElement = event.target as HTMLInputElement;
    this.parameters[key] = parseFloat(inputElement.value);
  }

  onInputChangeXvalue(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.yValue = parseFloat(inputElement.value);
  }

  getIntervalKeys(): string[] {
    return this.distribution?.intervals ? Object.keys(this.distribution.intervals) : [];
  }

  onIntervalChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.interval = selectElement.value;
  }

  isFormValid(): boolean {  
    return Object.values(this.parameters).every(param => !isNaN(param)) && this.yValue !== 0 && !isNaN(this.yValue);
  }

  getParameterEntries(parameters: { [key: string]: string }): { key: string, value: string }[] {
    const param = Object.entries(parameters).map(([key, value]) => ({ key, value }));
    console.log(param); 
    return param;
  }

  sendParameters(): void {
    if (this.distribution) {
      const dataToSend = {
        distribution: this.distribution,
        parameters: Object.values(this.parameters),
        yValue: this.yValue,
        interval: this.interval

      };
      this.distributionService.sendDistributionData(dataToSend).then(response => {
        response.interval = dataToSend.interval;    
        this.getInfoDistributionsService.updateDistributionData(response);
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }
}
