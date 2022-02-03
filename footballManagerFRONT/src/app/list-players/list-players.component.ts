import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {Player, PlayerService} from "../player.service";


@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.scss']
})

export class ListPlayersComponent implements OnInit {

  players?: Player[] = this.playerService.getAll();

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }
}
