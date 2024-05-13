import {Component} from '@angular/core';
import { Observable, Subject} from 'rxjs';
import {Country, State} from './types';
import {CountryService} from './country.service';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-exercise5',
  templateUrl: './exercise5.component.html',
  styleUrls: ['./exercise5.component.css']
})
export class Exercise5Component {
  countries$:Observable<Country[]>
  currentCountry$:Subject<Country>=new Subject<Country>()
  statesForCountry$:Observable<State[]>
  country:Country
  state:State

  constructor(private service:CountryService) {
    this.countries$=this.service.getCountries();
    this.statesForCountry$= this.currentCountry$.asObservable().pipe(
      switchMap(country => this.service.getStatesFor(country.id)));
  }

  updateState(country:Country){
    this.country=country
    this.state=null
    this.currentCountry$.next(country)
  }

  protected readonly event = event;
}
