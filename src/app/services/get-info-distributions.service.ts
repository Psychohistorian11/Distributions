import { Injectable } from "@angular/core";
import { Distribution } from "../models/distribution.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetInfoDistributionsService {

  private distributionDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public distributionData$: Observable<any> = this.distributionDataSubject.asObservable();


  constructor() {
    const savedData = localStorage.getItem('distributionData');
    if (savedData) {
      this.distributionDataSubject.next(JSON.parse(savedData));
    }
   }

  distributions: Distribution[] = [
    {
      name: 'Binomial',
      image: './../../assets/binomialDistribution.png',
      type: 'Discreta',
      description: 'La distribución binomial modela el número de éxitos en una secuencia de n ensayos independientes con una probabilidad fija de éxito en cada ensayo.',
      parameters: ['n (número de ensayos)', 'p (probabilidad de éxito)'],
      densityFunction: "P(Y = y) = \\binom{{{}}n{{}}}{{{}}y{{}}} p^y (1 - p)^{{{}}n - y{{}}}",
      applications: 'Se utiliza en control de calidad, genética (por ejemplo, herencia mendeliana) y procesos de toma de decisiones con dos posibles resultados.',
      examples: 'Lanzar una moneda 10 veces y contar las caras, número de productos defectuosos en un lote.',
      intervals: {
        'P(Y = y)': '=',
        'P(Y <= y)': '<=',
        'P(Y => y)': '>='
      }
    },
    {
      name: 'Poisson',
      image: './../../assets/poissonDistribution.png',
      type: 'Discreta',
      description: 'La distribución de Poisson describe la probabilidad de que ocurra un número dado de eventos en un intervalo fijo de tiempo o espacio.',
      parameters: ['λ (tasa de ocurrencia)'],
      densityFunction: 'P(Y = y) = \\frac{e^{-\\lambda} \\lambda^{y}}{y!}; \\quad \\text{para} \\quad y=0,1... ',
      applications: 'Modela eventos raros como fallos del sistema, número de llegadas a una cola, o número de llamadas telefónicas en un periodo de tiempo.',
      examples: 'Número de autos que pasan por un peaje en una hora, número de correos electrónicos recibidos en un día.',
      intervals: {
        'P(Y = y)': '=',
        'P(Y <= y)': '<=',
        'P(Y => y)': '>='
      }
    },
    {
      name: 'Uniforme',
      image: './../../assets/uniformDistribution.png',
      type: 'Continua',
      description: 'La distribución uniforme asigna igual probabilidad a cualquier valor dentro de un intervalo especificado.',
      parameters: ['θ_1', ' θ_2'],
      densityFunction: 'f(y) = \\frac{1}{\\theta_{{{}}2{{}}} - \\theta_{{{}}1{{}}}}, \\quad \\text{para } \\quad  \\theta_{{{}}1{{}}} \\leq y \\leq \\theta_{{{}}2{{}}}',
      applications: 'Se utiliza en simulaciones y muestreo aleatorio donde cada resultado tiene la misma probabilidad.',
      examples: 'Lanzar un dado justo, seleccionar un número al azar entre dos límites.',
      intervals: {
        'P(Y < y)': '<',
        'P(Y > y)': '>'
      }
    },
    {
      name: 'Chi²',
      image: './../../assets/chiScuared.png',
      type: 'Continua',
      description: 'La distribución chi-cuadrado describe la suma de los cuadrados de k variables normales estándar independientes.',
      parameters: ['v (grados de libertad)'],
      densityFunction: 'f(y) = \\frac{1}{{{}}2^{v/2} \\Gamma(v/2){{}}} y^{{{}}(v/2) - 1{{}}} e^{-y/2}, \\quad y > 0',
      applications: 'Se utiliza en pruebas de hipótesis, especialmente en la prueba chi-cuadrado para ajuste de bondad y prueba de independencia.',
      examples: 'Prueba de si un dado es justo, comparación de frecuencias esperadas vs. observadas en una tabla de contingencia.',
      intervals: {
        'P(Y < y)': '<',
        'P(Y > y)': '>'
      }
    },
    {
      name: 'Exponencial',
      image: './../../assets/exponentialDistribution.png',
      type: 'Continua',
      description: 'La distribución exponencial modela el tiempo entre eventos en un proceso de Poisson, donde los eventos ocurren de manera continua e independiente a una tasa constante.',
      parameters: ['λ (parámetro de tasa)'],
      densityFunction: 'f(y) = \\frac{1}{\\beta} e^{-y/\\beta}, \\quad y \\geq 0',
      applications: 'Se utiliza para modelar el tiempo hasta fallas o el tiempo entre eventos en sistemas como colas o electrónica.',
      examples: 'Tiempo entre llegadas de clientes a una tienda, tiempo hasta que una máquina falla.',
      intervals: {
        'P(Y < y)': '<',
        'P(Y > y)': '>'
      }
    },
    {
      name: 'Gamma',
      image: './../../assets/gammaDistribution.png',
      type: 'Continua',
      description: 'La distribución gamma generaliza la distribución exponencial y modela el tiempo hasta que ocurren k eventos en un proceso de Poisson.',
      parameters: ['α (forma)', ' β (tasa)'],
      densityFunction: 'f(y) = \\frac{1}{\\beta^ \\alpha \\Gamma(\\alpha)} y^{\\alpha - 1} e^{-y/ \\beta}  \\quad y > 0',
      applications: 'Se utiliza en modelos de colas, pruebas de vida útil y análisis de reclamaciones de seguros.',
      examples: 'Tiempo hasta múltiples fallos del sistema, modelado de cantidades de lluvia a lo largo del tiempo.',
      intervals: {
        'P(Y < y)': '<',
        'P(Y > y)': '>'
      }
    },
    {
      name: 'Normal',
      image: './../../assets/normalDistribution.png',
      type: 'Continua',
      description: 'La distribución normal o de Gauss describe la distribución de muchas variables aleatorias naturales y es simétrica con respecto a su media.',
      parameters: ['μ (media)', ' σ (desviación estándar)'],
      densityFunction: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{\\frac{-(y - \\mu)²}{2 \\sigma²}} \\quad  \\text{para} \\quad  -\\infty \\leq y \\leq \\infty',
      applications: 'Se utiliza en ciencias sociales, finanzas y fenómenos naturales donde los datos tienden a agruparse alrededor de un valor central.',
      examples: 'Altura de individuos en una población, errores de medición, retornos de acciones.',
      intervals: {
        'P(Y < y)': '<',
        'P(Y > y)': '>'
      }
    }
  ];

  getDistributions(): Distribution[] {
    return this.distributions;
  }

  getDistributionByName(name: string): Distribution | null {
    const dist = this.distributions.find((dist) => dist.name === name);
    return dist || null;
  }

  updateDistributionData(data: any): void {
    this.distributionDataSubject.next(data);
    localStorage.setItem('distributionData', JSON.stringify(data));
  }
  
}
