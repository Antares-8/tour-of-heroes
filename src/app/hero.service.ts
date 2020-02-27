import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // Send message when heroes are fetched
    this.messageService.add('HeroService says : fetched heroes');
    //return of(HEROES); // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    /** GET heroes from the server */
    return this.http.get<Hero[]>(this.heroesUrl) // get() returns response data
    .pipe(
      tap(_ => this.log('fetched heroes')), // tap looks, does smthg and send observable values
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  /**getHero(id: number): Observable<Hero> {
    // Send message after fetching hero
    this.messageService.add(`HeroService says : fetched hero id  = ${id}`); // /!\ backtick to bind property (id here)

    return of(HEROES.find(hero => hero.id === id));
  }*/

  private log(message: string) {
    this.messageService.add(`HeroService says : ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}