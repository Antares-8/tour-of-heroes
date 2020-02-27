import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router'; // to extract the id in the detail route to display the hero
import { Location } from '@angular/common'; //  = service for navigation back for instance 
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
// The route.snapshot is a static image of the route information shortly after the component was created.
// The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
// Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.

}