import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

// const baseUrl = 'http://football-manager/movies';
const baseeUrl = 'http://football-manager';
const baseUrl = 'http://football-manager/api/players';

import { catchError, map, tap } from 'rxjs/operators';

export interface StatsListResponse {
  items: Array<{
    stats: {
      strength: number | undefined;
      physicalCondition: number | undefined;
      defense: number | undefined;
      id: number | undefined;
    }
  }>;
}

export class Stats {
  strength: number | undefined;
  physicalCondition: number | undefined;
  defense: number | undefined;
  id: number | undefined;

  constructor(id : number | undefined,
              strength: number | undefined,
              physicalCondition: number | undefined,
              defense: number | undefined) {
    this.id = id;
    this.strength = strength;
    this.physicalCondition = physicalCondition;
    this.defense = defense;
  }
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  statsList : Stats[] | undefined;
  stats : Observable<Stats> | undefined;
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

  getAll(): Observable<Stats[]> | undefined {
    return this.http.get<Stats[]>(`${baseUrl}?page=1`).pipe(
        catchError(this.handleError<Stats[]>('getAll', []))
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseeUrl}/api/stats`, data).pipe(
        catchError(this.handleError<Stats>('create' ))
    );
  }

  update(id: any, data: any): Observable<Stats> {
    return this.http.put<Stats>(`${baseeUrl}/api/stats/${id}`, data).pipe(
        catchError(this.handleError<Stats>('findById' ))
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByUrl(getUrl: string): Observable<Stats> | undefined {
    return this.http.get<Stats>(`${baseeUrl}${getUrl}`).pipe(
        catchError(this.handleError<Stats>('findByUrl' ))
    );
  }

  findByTitle(title: any): Observable<StatsListResponse[]> {
    return this.http.get<StatsListResponse[]>(`${baseUrl}?title=${title}`);
  }
}
