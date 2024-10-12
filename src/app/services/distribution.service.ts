import { Injectable } from '@angular/core';
import { Distribution } from '../models/distribution.model';

@Injectable({
  providedIn: 'root',
})
export class DistributionService {

  constructor() { }

  sendDistributionData(data: { distribution: Distribution; parameters: number[], yValue: number, interval: string }) {

  }
}
