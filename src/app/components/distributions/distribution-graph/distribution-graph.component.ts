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
  distribution: any;
  myChart: any;

  constructor() {
    this.getInfoDistributionService.distributionData$.subscribe(data => {
      if (data) {
        this.distribution = data;
        this.xData = this.distribution?.x || [0];
        this.yData = this.distribution?.['f(x)'] || [0];

        if (this.myChart && this.xData.length > 0 && this.yData.length > 0) {
          this.updateChart();
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
    this.updateChart();

    this.handleResize();
  }

  updateChart() {
    if (!this.myChart) return;

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
        interval: 0.5,
      },
      yAxis: {
        type: 'value',
        name: 'Y',
        nameLocation: 'middle',
        nameGap: 40,
        axisLine: { lineStyle: { color: 'black' } },
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

  handleResize() {
    window.addEventListener('resize', () => {
      if (this.myChart) {
        this.myChart.resize();
      }
    });
  }
}
