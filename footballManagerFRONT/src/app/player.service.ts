import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface PlayersListResponse {
  totalItems: number;
  items: Array<{
    player: {
      nom: string;
    }
  }>;
}

export class Player {
  nom: string | undefined;

  constructor(nom: string | undefined) {
    this.nom = nom;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  bookCount: number | undefined;
  playerList: Player[] | undefined;

  private _bookListUrl = 'http://localhost::8000/playersList';

  constructor(private _httpClient: HttpClient) {
  }

  ngOnInit() {
    this._httpClient.get<PlayersListResponse>(this._bookListUrl)
        .subscribe(playersListResponse => {
          this.playerList = playersListResponse.items.map(item => new Player(item.player.nom));
        });
  }
}
