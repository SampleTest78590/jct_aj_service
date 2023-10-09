import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-calls-line-chart',
  templateUrl: './calls-line-chart.component.html',
  styleUrls: ['./calls-line-chart.component.scss'],
})
export class CallsLineChartComponent implements OnInit, OnChanges {
  constructor() { }
  public chart: any;
  @Input() chartData: any = [];
  @Input() nullStateMsg: any;

  ngOnInit() {
    // this.chartGenerate();
  }

  chartGenerate() {
    if (!!this.chart)
      this.chart?.destroy();
    this.chart = new Chart('callLineChart', {
      type: 'line',
      data: {
        labels: this.chartData?.label,
        datasets: [
          {
            // label: 'Total Leads',
            data: this.chartData?.dataset1,
            borderColor: this.chartData?.borderColor1 ? this.chartData?.borderColor1 : '#6D17CE',
            fill: false,
            tension: 0.3,
          },
          {
            // label: 'Connected Calls',
            data: this.chartData?.dataset2,
            borderColor: this.chartData?.borderColor2 ? this.chartData?.borderColor2 : '#25AB21',
            fill: false,
            tension: 0.3,
          },
          {
            // label: 'Failed Calls',
            data: this.chartData?.dataset3,
            borderColor: this.chartData?.borderColor3 ? this.chartData?.borderColor3 : '#F50031',
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
          datalabels: {
            display: false,
          },
        },
        scales: {
          y: {
            ticks: {
              precision: 0
            },
            beginAtZero: true,
            title: {
              display: true,
              text: this.chartData.xAxis ? this.chartData.xAxis : 'Number of Calls',
              font: {
                size: 12,
                weight: '500',
                lineHeight: '16px',
              },
              color: 'rgba(0, 0, 0, 0.65)',
            },
          },
          x: {
            title: {
              display: true,
              text: this.chartData.yAxis ? this.chartData.yAxis : 'Time',
              font: {
                size: 12,
                weight: '500',
                lineHeight: '16px'
              },
              color: 'rgba(0, 0, 0, 0.65)',
            },
          }
        },
      },
    });
  }


  ngOnChanges() {
    this.chartGenerate();
  }

}
