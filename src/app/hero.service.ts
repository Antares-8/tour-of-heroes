import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<Hero[]>(this.heroesUrl); // get() returns response data
  }

  getHero(id: number): Observable<Hero> {
    // Send message after fetching hero
    this.messageService.add(`HeroService says : fetched hero id  = ${id}`); // /!\ backtick to bind property (id here)

    return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this.messageService.add(`HeroService says : ${message}`);
  }
}