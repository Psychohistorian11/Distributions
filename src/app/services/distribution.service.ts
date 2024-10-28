import { Injectable } from '@angular/core';
import { Distribution } from '../models/distribution.model';
import axios from 'axios';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class DistributionService {

  private apiUrl = 'http://127.0.0.1:8000';
  private api = axios.create({ baseURL: this.apiUrl, withCredentials: true });
  currentDistribution: Distribution | null = null

  constructor() {}

  sendDistributionData(data: { distribution: Distribution; parameters: number[]; yValue: number; interval: string }): Promise<any> {
    this.currentDistribution = data.distribution
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

  private checkInteger(number: number, parameter: string): boolean {
    if (!Number.isInteger(number)) {
      this.showAlert('Error', `El parametro <strong>${parameter}</strong> debe ser un entero.`);
      return false;
    }
    return true;
  }

  private checkBetweenZeroOne(number: number, parameter: string): boolean {
    if (number < 0 || number > 1) {
      this.showAlert('Error', `El parametro <strong>${parameter}</strong> debe estar entre 0 y 1.`);
      return false;
    }
    return true;
  }

  private checkGreaterZero(number: number, parameter: string): boolean {
    if (number <= 0) {
      this.showAlert('Error', `El parámetro <strong>${parameter}</strong> debe ser mayor que cero.`);
      return false;
    }
    return true;
  }

private checkValueInRange(value: number, max: number): boolean {
  if (value < 0 || value > max) {
    this.showAlert('Error', `El valor x debe estar entre 0 y <strong> n = ${max}</strong>.`);
    return false;
  }
  return true;
}

private showAlert(title: string, html: string): void {
  Swal.fire({
    title: title,
    html: html, 
    icon: 'error',
    confirmButtonText: 'Aceptar',
  });
}



  private sendBinomialData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const n = data.parameters[0];
    const p = data.parameters[1];
    const x = data.yValue;
    
    if (!this.checkInteger(n, Object.keys(this.currentDistribution!.parameters)[0])) return Promise.reject('El primer parámetro debe ser entero.');
    if (!this.checkGreaterZero(n, Object.keys(this.currentDistribution!.parameters)[0])) return Promise.reject('El primer parámetro debe ser mayor que 0.');
    if (!this.checkBetweenZeroOne(p, Object.keys(this.currentDistribution!.parameters)[1])) return Promise.reject('El segundo parámetro debe estar entre 0 y 1 ')
    if (!this.checkValueInRange(x, n)) return Promise.reject(`El valor x debe estar entre 0 y ${n}.`);
  
    const body = { n, p, x, operator: data.interval };
    return this.sendRequest('discrete/binomial/', body);
  }

  private sendPoissonData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const lamb = data.parameters[0];
    const x = data.yValue;

    if (!this.checkGreaterZero(lamb, Object.keys(this.currentDistribution!.parameters)[0])) return Promise.reject('El primer parámetro debe ser mayor que 0.');

    const body = { lamb, x, operator: data.interval };
    return this.sendRequest('discrete/poisson/', body);
  }

  private sendUniformData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const body = { theta_1: data.parameters[0], theta_2: data.parameters[1], x: data.yValue, operator: data.interval };
    return this.sendRequest('continuos/uniform/', body);
  }

  private sendChiSquaredData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const v = data.parameters[0]
    const x = data.yValue

    if (!this.checkGreaterZero(v, Object.keys(this.currentDistribution!.parameters)[0])) return Promise.reject('El primer parámetro debe ser mayor que 0.');
    if (!this.checkGreaterZero(x, 'x')) return Promise.reject('El parámetro "x" debe ser mayor que 0.');


    const body = { v, x, operator: data.interval };
    return this.sendRequest('continuos/chi/', body);
  }

  private sendExponentialData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {

    const lamb = data.parameters[0]
    const x = data.yValue

    if (!this.checkGreaterZero(lamb, Object.keys(this.currentDistribution!.parameters)[0])) return Promise.reject('El primer parámetro debe ser mayor que 0.');
    if (!this.checkGreaterZero(x, 'x')) return Promise.reject('El parámetro "x" debe ser mayor que 0.');


    const body = { lamb, x, operator: data.interval };
    return this.sendRequest('continuos/exponential/', body);
  }

  private sendGammaData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {

    const alpha = data.parameters[0]
    const beta = data.parameters[1]
    const x = data.yValue

    if (!this.checkGreaterZero(alpha, Object.keys(this.currentDistribution!.parameters)[0])) return Promise.reject('El primer parámetro debe ser mayor que 0.');
    if (!this.checkGreaterZero(beta, Object.keys(this.currentDistribution!.parameters)[1])) return Promise.reject('El segundo parámetro debe ser mayor que 0.');
    if (!this.checkGreaterZero(x, 'x')) return Promise.reject('El parámetro "x" debe ser mayor que 0.');


    const body = { alpha, beta, x, operator: data.interval };
    return this.sendRequest('continuos/gamma/', body);
  }

  private sendNormalData(data: { parameters: number[]; yValue: number; interval: string }): Promise<any> {
    const mu = data.parameters[0];
    const sigma = data.parameters[1];
    const x = data.yValue

    if (!this.checkGreaterZero(sigma, Object.keys(this.currentDistribution!.parameters)[1])) return Promise.reject('El segundo parámetro debe ser mayor que 0.');

    const body = { mu, sigma, x, operator: data.interval };
    return this.sendRequest('continuos/normal/', body);
  }

}
