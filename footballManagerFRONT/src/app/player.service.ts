import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

// const baseUrl = 'http://football-manager/movies';
const baseUrl = 'http://football-manager/api/players';
import { catchError, map, tap } from 'rxjs/operators';

export interface PlayersListResponse {
  items: Array<{
    player: {
      name: string;
    }
  }>;
}

export class Player {
  name: string | undefined;
  description: string | undefined;
  id: number | undefined;
  stats: string | undefined;

  constructor(name: string | undefined,
              id: number | undefined,
              description: string | undefined,
              stats: string | undefined
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.stats = stats;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerList : Player[] | undefined;
  player : Observable<Player> | undefined;
  log : string | undefined;

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log = `${operation} failed: ${error.message}`;

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAll(): Observable<Player[]> | undefined {
    return this.http.get<Player[]>(`${baseUrl}?page=1`).pipe(
        catchError(this.handleError<Player[]>('getAll', []))
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<Player> {
    return this.http.put<Player>(`${baseUrl}/${id}`, data).pipe(
        catchError(this.handleError<Player>('findById' ))
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findById(id: number): Observable<Player> | undefined {
    return this.http.get<Player>(`${baseUrl}/${id}`).pipe(
        catchError(this.handleError<Player>('findById' ))
    );
  }


  findByTitle(title: any): Observable<PlayersListResponse[]> {
    return this.http.get<PlayersListResponse[]>(`${baseUrl}?title=${title}`);
  }
}
