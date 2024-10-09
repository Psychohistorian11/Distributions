import { Injectable } from '@angular/core';
import { Distribution } from '../models/distribution.model';

@Injectable({
  providedIn: 'root'
})
export class GetInfoDistributionsService {

  constructor() { }

  distriutions: Distribution[] = [
    {
      name: 'Binomial',
      image: './../../assets/binomialDistribution.png',
      type: 'Discrete',
      description: 'The binomial distribution models the number of successes in a sequence of n independent trials with a fixed probability of success on each trial.'
    },
    {
      name: 'Poisson',
      image: './../../assets/poissonDistribution.png',
      type: 'Discrete',
      description: 'The Poisson distribution describes the probability of a given number of events occurring in a fixed interval of time or space.'
    },
    {
      name: 'Uniform',
      image: './../../assets/uniformDistribution.png',
      type: 'Continuous',
      description: 'The uniform distribution assigns equal probability to any value within a specified interval.'
    },
    {
      name: 'Chi²',
      image: './../../assets/chiScuared.png',
      type: 'Continuous',
      description: 'The chi-squared distribution describes the sum of the squares of k independent standard normal random variables.'
    },
    {
      name: 'Exponential',
      image: './../../assets/exponentialDistribution.png',
      type: 'Continuous',
      description: 'The exponential distribution models the time between events in a Poisson process, where events occur continuously and independently at a constant rate.'
    },
    {
      name: 'Gamma',
      image: './../../assets/gammaDistribution.png',
      type: 'Continuous',
      description: 'The gamma distribution generalizes the exponential distribution and models the time until k events occur in a Poisson process.'
    },
    {
      name: 'Normal',
      image: './../../assets/normalDistribution.png',
      type: 'Continuous',
      description: 'The normal, or Gaussian, distribution describes the distribution of many natural random variables and is symmetric about its mean.'
    }
  ]



  getDistributions(): Distribution[] {
    return this.distriutions

  }

}
