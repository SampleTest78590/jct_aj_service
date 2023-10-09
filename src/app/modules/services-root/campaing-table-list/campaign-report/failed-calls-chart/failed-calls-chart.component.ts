import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-failed-calls-chart',
  templateUrl: './failed-calls-chart.component.html',
  styleUrls: ['./failed-calls-chart.component.scss'],
})
export class FailedCallsChartComponent implements OnInit, OnChanges {
  constructor() { }

  public chart: any;
  @Input() chartData: any = [];
  @Input() backgroundColor = [
    '#7AEBD9', //mint-green
    '#F7AB20', //yellow
    '#ED617F', //crimson
    '#89DCFF', //midnight-sky
    '#F680F9', //violet
  ];
  ifZero: boolean = false;

  ngOnInit() {
  }

  generatePiechart() {

    this.ifZero = this.chartData?.map((data: any) => data?.percentage?.toString().replace(/[%]/g, '')).filter((v: any) => v == '0')?.length > 0 ? true : false;

    if (this.chart && this.chart.destroy) {
      this.chart.destroy();
    }
    if (this.chartData && this.chartData.length) {
      this.chart = new Chart('FailedCalls', {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: this.chartData?.length == 0 ? [] : this.chartData?.map((data: any) => data?.percentage?.toString().replace(/[%]/g, '')),
              backgroundColor: this.backgroundColor,
              borderWidth: 0,
              hoverBorderWidth: 0,
              spacing: 0,
            },
          ],
        },
        options: {
          plugins: {
            datalabels: {
              formatter: (val) => {
                return val != '0' && !!val ? val + '%' : '';
              },
              color: '#2A0009',
              font: {
                size: 12,
                lineHeight: 16,
                weight: 500,
              },
            },
            tooltip: {
              enabled: true,
            }
          },
        },
      });
    }
  }

  ngOnChanges() {
    this.generatePiechart();
  }
}
