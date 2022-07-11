import {Component, OnInit} from '@angular/core';
import {EChartsOption} from 'echarts';

@Component({
  selector: 'app-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.scss'],
})
export class LinearComponent implements OnInit {
  options: EChartsOption;
  echartInstance: any;
  rawData: any;

  constructor() {
    const dt = new Date();
    this.options = {};
    this.rawData = {
      definition: {
        id: 'moldLevel',
        name: 'mold level',
        unit: 'mm',
        yAxisRange: [0, 100],
      },
      values: [
        {
          time: dt.getTime() / 1000,
          signal: Math.floor(Math.random() * 100),
        },
        {
          time: dt.getTime() / 1000 + 1,
          signal: Math.floor(Math.random() * 100),
        },
        {
          time: dt.getTime() / 1000 + 2,
          signal: Math.floor(Math.random() * 100),
        },
        {
          time: dt.getTime() / 1000 + 3,
          signal: Math.floor(Math.random() * 100),
        },
        {
          time: dt.getTime() / 1000 + 4,
          signal: Math.floor(Math.random() * 100),
        },
        {
          time: dt.getTime() / 1000 + 5,
          signal: Math.floor(Math.random() * 100),
        },
        {
          time: dt.getTime() / 1000 + 6,
          signal: Math.floor(Math.random() * 100),
        },
        {
          time: dt.getTime() / 1000 + 7,
          signal: Math.floor(Math.random() * 100),
        },
        {
          time: dt.getTime() / 1000 + 8,
          signal: Math.floor(Math.random() * 100),
        },
      ],
    };
  }

  ngOnInit(): void {
    const data1: any[] = [];
    const dt = +new Date();
    console.log(this.rawData);

    for (let i = 0; i < 100; i++) {
      data1.push([
        dt + i * 1000,
        (Math.sin(i / 5) * ((i * 2) / 5 - 10) + i / 6) * 5,
      ]);
    }

    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'shadow'},
        formatter: function (params) {
          // for(const data of params.data)
          if (Array.isArray(params)) {
            let dataString = '';
            for (let i = 0; i < params.length; i++) {
              const data = params[i].data;
              if (Array.isArray(data)) {
                const xData = data[0];
                const yData = data[1];
                const dateString = new Date(xData).toLocaleTimeString('en-US');
                dataString +=
                  '<b>' +
                  params[0].seriesName +
                  '</b></br>' +
                  dateString +
                  '</br>' +
                  yData +
                  '</br>';
              }
            }
            return dataString;
          }
          return '';
        },
      },
      toolbox: {
        feature: {
          dataZoom: {},
        },
      },
      legend: {
        data: ['Sinus', 'Cosinus', 'Tangens'],
        align: 'left',
      },
      xAxis: {
        silent: false,
        splitLine: {
          show: false,
        },
        type: 'time',
        axisLabel: {
          formatter: function (value: any) {
            if (typeof value === 'number') {
              const asDate = new Date(value);
              return asDate.toLocaleTimeString('en-US');
            }
            return value;
          },
        },
      },
      yAxis: [
        {
          id: 'axisSin',
          name: 'sin',
          type: 'value',
          position: 'left',
          splitLine: {
            show: false,
          },
        },
        // {
        //   id: 'axisCos',
        //   name: 'cos',
        //   type: 'value',
        //   position: 'left',
        //   offset: 50,
        //   splitLine: {
        //     show: true,
        //   },
        // },
        // {
        //   id: 'axisTan',
        //   name: 'tan',
        //   type: 'value',
        //   position: 'right',
        //   splitLine: {
        //     show: false,
        //   },
        // },
      ],
      series: [
        {
          name: 'Sinus',
          type: 'line',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
          yAxisId: 'axisSin',
        },
        // {
        //   name: 'Cosinus',
        //   type: 'line',
        //   data: data2,
        //   animationDelay: (idx: number) => idx * 10 + 100,
        //   yAxisId: 'axisCos',
        // },
        // {
        //   name: 'Tangens',
        //   type: 'line',
        //   data: data3,
        //   animationDelay: (idx: number) => idx * 10 + 100,
        //   yAxisId: 'axisTan',
        // },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

  onChartLegendSelectChanged(e: any) {
    // name: string, selected: any[], type: string
    for (let entry of Object.entries(e.selected)) {
      let key: string = entry[0];
      let value: boolean = !!entry[1];

      let yAxisId = this.getYAxisIdFromSeries(key);

      if (yAxisId) {
        this.setYAxisVisibility(yAxisId, value);
      }

      this.updateVisibleSplitLine();
    }

    this.echartInstance.setOption(this.options);
  }

  onEChartInit(e: any) {
    this.echartInstance = e;
  }

  setYAxisVisibility(axisId: string, visibility: boolean) {
    const yAxisConfig = this.options.yAxis;
    if (Array.isArray(yAxisConfig)) {
      const filteredYAxisConfig = yAxisConfig.filter(e => e.id === axisId);

      if (filteredYAxisConfig.length) {
        const yAxisConfig = filteredYAxisConfig[0];
        yAxisConfig.show = visibility;
      }
    }
  }

  updateVisibleSplitLine() {
    let graphHasVisibleLines = false;

    const yAxisConfig = this.options.yAxis;
    if (Array.isArray(yAxisConfig)) {
      for (const e of yAxisConfig) {
        const splitLineConfig = e.splitLine;
        const axisVisible = e.show!;

        if (splitLineConfig) {
          if (!graphHasVisibleLines) {
            splitLineConfig.show = axisVisible;
            graphHasVisibleLines = axisVisible;
          } else {
            splitLineConfig.show = false;
          }
        }
      }
    }
  }

  getYAxisIdFromSeries(seriesName: string) {
    const series = this.options.series;

    if (Array.isArray(series)) {
      let filteredSeries = series.filter(s => s.name === seriesName);

      if (filteredSeries.length) {
        let entrySeries: any = filteredSeries[0]; // Can not set type because eChart Lib
        return entrySeries.yAxisId;
      }
    }

    return undefined;
  }
}
