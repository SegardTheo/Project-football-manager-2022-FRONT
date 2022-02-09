import { Injectable } from '@angular/core';
import {Team} from "./team.service";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Player} from "./player.service";

const baseUrlRandomMatch = 'http://football-manager/api/players/RandomMatch';

export class TeamDetails {
  score: number | undefined;
  team: Team[] | undefined;

  constructor(
      score: number | undefined,
      team: Team[] | undefined,
  ) {
    this.score = score;
    this.team = team;
  }
}

export class Match {
  firstTeam: TeamDetails | undefined;
  secondTeam: TeamDetails | undefined;

  constructor(
      firstTeam: TeamDetails | undefined,
      secondTeam: TeamDetails | undefined,
  ) {
    this.firstTeam = firstTeam;
    this.secondTeam = secondTeam;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  Match : Match | undefined;
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

  getRandomMatch(): Observable<Player[]> | undefined {
    return this.http.get<Player[]>(`${baseUrlRandomMatch}?page=1`).pipe(
        catchError(this.handleError<Player[]>('getRandomMatch', []))
    );
  }
}
