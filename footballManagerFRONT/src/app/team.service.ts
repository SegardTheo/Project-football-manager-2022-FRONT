import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

// const baseUrl = 'http://football-manager/movies';
const baseUrl = 'http://football-manager/api/teams';
import { catchError, map, tap } from 'rxjs/operators';

export class Team {
  name: string | undefined;
  id: number | undefined;

  constructor(name: string | undefined,
              id: number | undefined
  ) {
    this.name = name;
    this.id = id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamList : Team[] | undefined;
  team : Observable<Team> | undefined;
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

  getAll(): Observable<Team[]> | undefined {
    return this.http.get<Team[]>(`${baseUrl}?page=1`).pipe(
        catchError(this.handleError<Team[]>('getAll', []))
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<Team> {
    return this.http.put<Team>(`${baseUrl}/${id}`, data).pipe(
        catchError(this.handleError<Team>('findById' ))
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findById(id: number): Observable<Team> | undefined {
    return this.http.get<Team>(`${baseUrl}/${id}`).pipe(
        catchError(this.handleError<Team>('findById' ))
    );
  }
}
