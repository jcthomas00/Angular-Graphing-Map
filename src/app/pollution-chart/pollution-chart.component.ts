import { Component, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { Chart, ChartType, ChartOptions, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'pollution-chart',
  templateUrl: './pollution-chart.component.html',
  styleUrls: ['./pollution-chart.component.scss']
})
export class PollutionChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  //chart labels
  public MONTH_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //data for child components
  @Input() airQuality:number[] = [];
  @Input() rain:number[] = [];

  title:string = 'Rain Vs Air Quality';

  //set chart options
  public barChartOptions: ChartOptions = {
    responsive: true,
    elements: {
        line: {
            tension: .4
        }
    },
    backgroundColor: '#43CBFF',
    maintainAspectRatio: false
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  barChartLabels: string[] = this.MONTH_LABELS;
  public barChartData: ChartDataset[] = [
    { data: this.airQuality, label: 'Air Quiality Index', type: 'line', backgroundColor:'#F05F57' },
    { data: this.rain, label: 'Mean Precipitation', type: 'bar' }
  ];
  
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges):void {
    
    //look for changes in @input and updates the chart after waiting 1 second (to compensate for initial load)
    for (const propName in changes) {
      setTimeout(() => {
        if(propName === 'airQuality'){
          this.barChartData[0].data = changes[propName].currentValue;
          this.chart.chart?.update();
        }
        if(propName === 'rain'){
          console.log("Rain: ", changes[propName].currentValue)
          this.barChartData[1].data=changes[propName].currentValue;
          this.chart.chart?.update();
        }
      },1000);
    }
  }

}
