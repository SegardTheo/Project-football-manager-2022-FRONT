import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {Player, PlayerService} from "../player.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.scss']
})

export class ListPlayersComponent implements OnInit {

  players?: Player[] | null = null;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.playerService.getAll().subscribe((data)=>{
      this.players = data;
    });
  }
}
