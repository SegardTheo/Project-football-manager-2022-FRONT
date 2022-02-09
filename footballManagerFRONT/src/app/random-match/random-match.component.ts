import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Match, MatchService} from "../match.service";

@Component({
  selector: 'app-random-match',
  templateUrl: './random-match.component.html',
  styleUrls: ['./random-match.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RandomMatchComponent implements OnInit {
  match: Match | undefined;
  displayedColumns: string[] | undefined;
  dataSource: number[] | undefined;

  constructor(private matchService : MatchService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.matchService.getRandomMatch().subscribe((data)=>{
      // @ts-ignore
      this.match = data;

      this.displayedColumns = ['score'];
      // @ts-ignore
      this.dataSource = [this.match?.firstTeam?.score, this.match?.secondTeam?.score];
    });
  }

}
