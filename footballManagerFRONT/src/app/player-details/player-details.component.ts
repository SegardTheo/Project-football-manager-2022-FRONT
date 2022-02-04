import { Component, OnInit } from '@angular/core';
import {Player, PlayerService} from "../player.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Stats, StatsService} from "../stats.service";

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {
  player?: Player | null = null;
  stats?: Stats | null = null;
  idPlayer : number | undefined;

  constructor(private playerService: PlayerService,
              private route: ActivatedRoute,
              private statsService : StatsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idPlayer = params['id'];
    });

    // @ts-ignore
    this.playerService.findById(this.idPlayer).subscribe((data)=>{
      this.player = data;

      if(this.player?.stats != null)
      {
        // @ts-ignore
        this.statsService.findByUrl(this.player?.stats).subscribe((data)=>{
          this.stats = data;
        });
      }
    });
  }
}
