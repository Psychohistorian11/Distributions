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
  public parameters: number[] = [];
  yValue: number = 0
  interval: string = '='

  private route = inject(ActivatedRoute);
  private getInfoDistributionsService = inject(GetInfoDistributionsService);
  private distributionService = inject(DistributionService);

  constructor() { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.distributionName = params['input'];
      this.distribution = this.getInfoDistributionsService.getDistributionByName(this.distributionName);

      if (this.distribution) {
        this.parameters = new Array(this.distribution.parameters.length).fill(0);
      }
    });
  }

  onInputChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    this.parameters[index] = parseFloat(inputElement.value);
  }

  onInputChangeYvalue(event: Event): void {
    const inputElement = event.target as HTMLInputElement
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
    return this.parameters.every(param => !isNaN(Number(param))) && this.yValue !== 0 && !isNaN(Number(this.yValue));
  }


  sendParameters(): void {
    if (this.distribution) {
      const dataToSend = {
        distribution: this.distribution,
        parameters: this.parameters,
        yValue: this.yValue,
        interval: this.interval
      };

          this.distributionService.sendDistributionData(dataToSend).then(response => {
        console.log('Respuesta de la API:', response);

        this.getInfoDistributionsService.updateDistributionData(response);

      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }
}
