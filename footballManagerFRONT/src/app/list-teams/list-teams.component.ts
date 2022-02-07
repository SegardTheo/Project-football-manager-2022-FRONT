import { Component, OnInit } from '@angular/core';
import {Player, PlayerService} from "../player.service";
import {Team, TeamService} from "../team.service";

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.scss']
})
export class ListTeamsComponent implements OnInit {
  teams?: Team[] | null = null;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.teamService.getAll().subscribe((data)=>{
      this.teams = data;
    });
  }
}
