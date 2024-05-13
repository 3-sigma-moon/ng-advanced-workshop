import {Component} from '@angular/core';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {Country, State} from './types';
import {FormControl} from '@angular/forms';
import {CountryService} from './country.service';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-exercise4',
  templateUrl: './exercise4.component.html',
  styleUrls: ['./exercise4.component.css']
})
export class Exercise4Component {

  countries$: Observable<Country[]>;
  states$!: Observable<State[]>;
  state!: State;
  countryControl = new FormControl<Country['id']>('');
  stateControl = new FormControl<State['description']>('');
  currentCountry$:Subject<Country>
  statesForCountry$:Observable<State[]> = of([])

  sort = (a, b) => a.description.toLowerCase().indexOf((b ?? "").toLowerCase()) !== -1

  constructor(private service: CountryService) {
    this.currentCountry$= new Subject<Country>()
    this.statesForCountry$ = this.currentCountry$.asObservable().pipe(switchMap(
      country => this.service.getStatesFor(country.id)
    ))

    this.countries$ = this.countryControl.valueChanges.pipe(
      withLatestFrom(this.service.getCountries()),
      map(([userInput, countries]) => countries.filter(c => this.sort(c, userInput)))
    );

    this.states$ = combineLatest([this.stateControl.valueChanges,this.statesForCountry$]).pipe(
      map(([userInput, states]) => states.filter(s => this.sort(s, userInput))));
  }


  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.states$ = this.service.getStatesFor(country.id);
    this.currentCountry$.next(country);
  }
}
