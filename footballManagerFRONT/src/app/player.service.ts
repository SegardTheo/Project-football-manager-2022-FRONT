import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

// const baseUrl = 'http://football-manager/movies';
const baseUrl = 'http://football-manager/api/players';
import { catchError, map, tap } from 'rxjs/operators';
import {Team} from "./team.service";

export class Player {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  strength: number | undefined;
  physicalCondition: number | undefined;
  defense: number | undefined;
  team: Team | undefined;

  constructor(name: string | undefined,
              id: number | undefined,
              description: string | undefined,
              strength: number | undefined,
              physicalCondition: number | undefined,
              defense: number | undefined,
              team: Team | undefined
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.strength = strength;
    this.physicalCondition = physicalCondition;
    this.defense = defense;
    this.team = team;
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
    console.log(baseUrl);
    console.log(data);
    return this.http.post(baseUrl, data).pipe(
        catchError(this.handleError<Player>('create' ))
    );
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
}
