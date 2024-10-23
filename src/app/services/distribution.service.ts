import { Injectable } from '@angular/core';
import { Distribution } from '../models/distribution.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DistributionService {

  private apiUrl = 'http://127.0.0.1:8000';
  private api = axios.create({ baseURL: this.apiUrl, withCredentials: true });

  constructor() {}

  sendDistributionData(data: { distribution: Distribution; parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const distributionTypeMap: { [key: string]: (data: any) => Promise<any> } = {
      'Binomial': this.sendBinomialData.bind(this),
      'Poisson': this.sendPoissonData.bind(this),
      'Uniforme': this.sendUniformData.bind(this),
      'Chi²': this.sendChiSquaredData.bind(this),
      'Exponencial': this.sendExponentialData.bind(this),
      'Gamma': this.sendGammaData.bind(this),
      'Normal': this.sendNormalData.bind(this), 
    };

    const sendFunction = distributionTypeMap[data.distribution.name];
    if (!sendFunction) throw new Error(`No se reconoce la distribución: ${data.distribution.name}`);

    return sendFunction(data);
  }

  private async sendRequest(endpoint: string, body: any): Promise<any> {
    try {
      const response = await this.api.post(endpoint, body);
      return response.data;
    } catch (error) {
      console.error('Error en la petición Axios:', error);
      throw error;
    }
  }

  private sendBinomialData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const body = { n: data.parameters[0], p: data.parameters[1], x: data.yValue, operator: data.interval };
    return this.sendRequest('discrete/binomial/', body);
  }

  private sendPoissonData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const body = { lamb: data.parameters[0], x: data.yValue, operator: data.interval };
    return this.sendRequest('discrete/poisson/', body);
  }

  private sendUniformData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const body = { theta_1: data.parameters[0], theta_2: data.parameters[1], x: data.yValue, operator: data.interval };
    return this.sendRequest('continuos/uniform/', body);
  }

  private sendChiSquaredData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const body = { v: data.parameters[0], x: data.yValue, operator: data.interval };
    return this.sendRequest('continuos/chi/', body);
  }

  private sendExponentialData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const body = { lamb: data.parameters[0], x: data.yValue, operator: data.interval };
    return this.sendRequest('continuos/exponential/', body);
  }

  private sendGammaData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const body = { alpha: data.parameters[0], beta: data.parameters[1], x: data.yValue, operator: data.interval };
    return this.sendRequest('continuos/gamma/', body);
  }

  private sendNormalData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const body = { mu: data.parameters[0], sigma: data.parameters[1], x: data.yValue, operator: data.interval };
    return this.sendRequest('continuos/normal/', body);
  }
}
