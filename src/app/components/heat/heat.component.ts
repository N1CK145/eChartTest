import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-heat',
  templateUrl: './heat.component.html',
  styleUrls: ['./heat.component.scss']
})
export class HeatComponent implements OnInit {

  options: EChartsOption;
  xData: any[];
  yData: any[];
  data: any[];

  height: number;
  width: number;

  constructor() {
    this.height = 5;
    this.width = 4;
    this.options = {};
    this.xData = [];
    this.yData = [];
    this.data = [];
  }

  ngOnInit(): void {
    this.data = this.generateData();

    console.log(this.data)

    this.options = {
      grid: {

      },
      xAxis: {
        type: 'category',
        data: this.xData
      },
      yAxis: {
        type: 'category',
        data: this.yData,
      },
      series: {
        type: 'heatmap',
        data: this.data,
        animation: false,
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        realtime: false,
        splitNumber: 6,
        inRange: {
          color: [
            '#313695',
            '#74add1',
            '#e0f3f8',
            '#fee090',
            '#f46d43',
            '#a50026'
          ]
        }
      },
    }
  }

  generateData(){
    let data = [];
    for (let i = 0; i <= this.width; i++) {
      for (let j = 0; j <= this.height; j++) {
        data.push([i, j, Math.random() * 100]);
      }
      this.xData.push(i);
    }
    for (let j = 0; j < this.height; j++) {
      this.yData.push(j);
    }
    
    return data;
  }

}
