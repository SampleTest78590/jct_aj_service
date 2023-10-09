import { Component, Input, OnInit, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-sms-chart',
  templateUrl: './sms-chart.component.html',
  styleUrls: ['./sms-chart.component.scss']
})
export class SmsChartComponent implements OnInit, OnChanges {
  public chart: any;
  @Input() BarChartData: any = [];
  @Input() emptyStateMsg: any;
  constructor() { }


  ngOnInit(): void {
    // this.createChart();
  }
  ngOnChanges(): void {
    this.createChart();
  }
  createChart() {
    if (!!this.chart)
      this.chart?.destroy();
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.BarChartData?.labels,
        datasets: [
          {
            data: this.BarChartData.data,
            backgroundColor: this.BarChartData.backgroundColor ? this.BarChartData.backgroundColor : '#6d17ce'
          }

        ]
      },
      options: {
        // aspectRatio: 2.5
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false
          }
        },
        scales: {
          x: {
            
            title: {
              display: true,
              text: this.BarChartData.xaxis ? this.BarChartData.xaxis : 'Time',
              font: {
                size: 12,
                weight: '500',
                lineHeight: '16px',
              }
            }
          },
          y: {
            ticks: {
              precision: 0
            },
            beginAtZero: true,
            type: 'linear',
            grace: '1%',
            title: {
              display: true,
              text: this.BarChartData.yaxis ? this.BarChartData.yaxis : 'Submitted SMS',
              font: {
                size: 12,
                weight: '500',
                lineHeight: '16px',
              }
            }
          }
        }
      }

    });
  }


}
