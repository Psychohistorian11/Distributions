import { Component, AfterViewInit, HostListener } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-distribution-graph',
  standalone: true,
  templateUrl: './distribution-graph.component.html',
  styleUrls: ['./distribution-graph.component.css'],
})
export class DistributionGraphComponent implements AfterViewInit {

  xData: number[] = [];
  yData: number[] = [];
  myChart: any;

  ngAfterViewInit() {
    const normalData = this.generateNormalDistributionData(0, 1, 50);
    this.xData = normalData.xData;
    this.yData = normalData.yData;

    this.initializeChart();
    this.handleResize(); // Inicializamos para asegurar el tamaño correcto
  }

  generateNormalDistributionData(mean: number, stdDev: number, numPoints: number): { xData: number[], yData: number[] } {
    const xData: number[] = [];
    const yData: number[] = [];

    const step = (6 * stdDev) / numPoints;
    for (let i = -3 * stdDev; i <= 3 * stdDev; i += step) {
      xData.push(i);
      const yValue = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(i - mean, 2) / (2 * Math.pow(stdDev, 2)));
      yData.push(yValue);
    }

    return { xData, yData };
  }

  initializeChart() {
    const chartDom = document.getElementById('main')!;
    this.myChart = echarts.init(chartDom);

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
          formatter: (val: number) => val.toFixed(2),
        },
      },
      yAxis: {
        type: 'value',
        name: 'Y',
        nameLocation: 'middle',
        nameGap: 40,
        axisLine: { lineStyle: { color: 'black' } },
      },
      grid: {
        left: '7% ',
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
          areaStyle: {
            opacity: 0.1,
          },
          emphasis: {
            focus: 'series',
          },
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


  @HostListener('window:resize')
  handleResize() {
    if (this.myChart) {
      this.myChart.resize();
    }
  }
}
