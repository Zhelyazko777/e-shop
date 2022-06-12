import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent implements OnInit {
  @Input()
  labels: string[] = [];

  @Input()
  scores: number[] = [];

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  pieChartData: ChartData<'pie', number[], string | string[]> | null = null;

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    const labels = this.labels;
    const scores = this.scores;

    this.pieChartData = {
      labels: labels,
      datasets: [
        {
          data: scores,
        },
      ],
    };
  }
}
