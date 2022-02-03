import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://football-manager/movies';
//const baseUrl = 'http://football-manager/api/players?page=1';

export interface PlayersListResponse {
  items: Array<{
    player: {
      name: string;
    }
  }>;
}

export class Player {
  name: string | undefined;

  constructor(name: string | undefined) {
    this.name = name;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerList : Player[] | undefined;

  constructor(private http: HttpClient) { }

  getAll(): Player[] | undefined {
    this.http.get<Player[]>(baseUrl)
      .subscribe(data => {
        this.playerList = data;
        console.log(this.playerList);
      });

    return this.playerList;
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<PlayersListResponse[]> {
    return this.http.get<PlayersListResponse[]>(`${baseUrl}?title=${title}`);
  }
}
