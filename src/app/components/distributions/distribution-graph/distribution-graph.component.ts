import { Component, AfterViewInit,  inject } from '@angular/core';
import * as echarts from 'echarts';
import { GetInfoDistributionsService } from '../../../services/get-info-distributions.service';

@Component({
  selector: 'app-distribution-graph',
  standalone: true,
  templateUrl: './distribution-graph.component.html',
  styleUrls: ['./distribution-graph.component.css'],
})
export class DistributionGraphComponent implements AfterViewInit {
  private getInfoDistributionService = inject(GetInfoDistributionsService);

  xData: number[] = [];
  yData: number[] = [];
  probability: number = 0;
  interval: string = ''
  distribution: any;
  type: string = ''
  Xvalue: number = 0

  myChart: any;

  constructor() {
    this.getInfoDistributionService.distributionData$.subscribe(data => {
      if (data) {
        this.distribution = data;

        console.log("distribution:", this.distribution)
        
        this.type = this.distribution?.type || '';
        this.probability = this.distribution?.probability || 0;
        this.interval = this.distribution?.interval || '';
        this.xData = this.distribution?.x || [0];
        this.yData = this.distribution?.['f(x)'] || [0];
        this.Xvalue = this.distribution?.Xvalue;

        if (this.myChart && this.xData.length > 0 && this.yData.length > 0) {
          if(this.type === 'Discreta'){
            this.updateChartDiscreta()
            }
          else if(this.type === 'Continua'){
            this.updateChartContinua();
          }
          
        }
      }
    });
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  initializeChart() {
    const chartDom = document.getElementById('main')!;
    if (!chartDom) return;

    this.myChart = echarts.init(chartDom);
    if(this.type === 'Discreta'){
      this.updateChartDiscreta()
      }
    else if(this.type === 'Continua'){
      this.updateChartContinua();
    }

    this.handleResize();
  }

  updateChartDiscreta() {
    if (!this.myChart) return;
  
    const seriesData = this.xData.map((x, index) => {
      let color = 'rgba(72, 118, 255, 0.8)'; 
  
      if (
        (this.interval === '=' && x === this.Xvalue) ||
        (this.interval === '<' && x <= this.Xvalue) ||
        (this.interval === '>' && x >= this.Xvalue)
      ) {
        color = 'rgba(255, 127, 80, 1)'; 
      }
  
      return {
        value: this.yData[index],
        itemStyle: { color: color },
      };
    });
  
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const { value } = params[0];
          return `X: ${value[0]}<br/>Y: ${value[1].toFixed(4)}`;
        },
      },
      xAxis: {
        type: 'category',
        name: 'X',
        nameLocation: 'middle',
        nameGap: 25,
        axisLine: { lineStyle: { color: 'black' } },
        data: this.xData,
        axisLabel: {
          interval: (index: number) => index % Math.ceil(this.xData.length / 10) === 0,
          fontSize: 10,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Y',
        nameLocation: 'middle',
        nameGap: 40,
        axisLine: { lineStyle: { color: 'black' } },
        axisLabel: {
          fontSize: 10,
        },
      },
      grid: {
        left: '7%',
        right: '2%',
        bottom: '15%',
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          barWidth: '60%',
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: 0,
        },
        {
          type: 'slider',
          xAxisIndex: 0,
          start: 0,
          end: 100,
        },
      ],
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataZoom: {
            yAxisIndex: 'none',
          },
        },
      },
    };
  
    this.myChart.setOption(option);
  }
  
  updateChartContinua() {
    if (!this.myChart) return;
  
    const shadedData = this.xData
      .map((x, i) => 
        this.interval === '>' && x >= this.Xvalue ? [x, this.yData[i]] :
        this.interval === '<' && x <= this.Xvalue ? [x, this.yData[i]] :
        null
      )
      .filter(point => point !== null); 
  
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const { value } = params[0];
          return `X: ${value[0].toFixed(2)}<br/>Y: ${value[1].toFixed(4)}`;
        },
      },
      xAxis: {
        type: 'value',
        name: 'X',
        nameLocation: 'middle',
        nameGap: 25,
        axisLine: { lineStyle: { color: 'black' } },
        axisLabel: {
          interval: (value: number) => value % Math.ceil(this.xData[this.xData.length - 1] / 10) === 0, // Cada 10 valores aproximadamente
          fontSize: 10,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Y',
        nameLocation: 'middle',
        nameGap: 40,
        axisLine: { lineStyle: { color: 'black' } },
        axisLabel: {
          fontSize: 10,
        },
      },
      grid: {
        left: '7%',
        right: '2%',
        bottom: '15%',
      },
      series: [
        {
          data: this.yData.map((y, index) => [this.xData[index], y]),
          type: 'line',
          smooth: true,
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'red' },
                { offset: 1, color: 'blue' },
              ],
            },
            width: 1,
          },
          markLine: {
            data: [
              {
                xAxis: this.Xvalue,
                label: {
                  formatter: 'Probability',
                  position: 'end',
                },
                lineStyle: {
                  color: 'orange',
                  type: 'dashed',
                  width: 2,
                },
              },
            ],
          },
        },
        {
          data: shadedData,
          type: 'line',
          smooth: true,
          areaStyle: {
            color: 'rgba(255, 165, 0, 0.3)', 
          },
          lineStyle: { opacity: 0 },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: 0,
        },
        {
          type: 'slider',
          xAxisIndex: 0,
          start: 0,
          end: 100,
        },
      ],
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataZoom: {
            yAxisIndex: 'none',
          },
        },
      },
    };
  
    this.myChart.setOption(option);
  }
  

  handleResize() {
    window.addEventListener('resize', () => {
      if (this.myChart) {
        this.myChart.resize();
      }
    });
  }
}
