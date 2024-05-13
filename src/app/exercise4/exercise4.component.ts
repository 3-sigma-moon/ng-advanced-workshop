import {Component, OnInit} from '@angular/core';
import {combineLatest, combineLatestWith, Observable, of, startWith, Subject} from 'rxjs';
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
  countryControl: FormControl;
  stateControl: FormControl
  currentCountry$: Subject<Country>
  statesForCountry$: Observable<State[]>

  find = (a, b) => a.description.toLowerCase().indexOf((b ?? "").toLowerCase()) !== -1

  constructor(private service: CountryService) {
    this.currentCountry$ = new Subject<Country>()
    this.countryControl = new FormControl<Country['id']>('')
    this.stateControl = new FormControl<State['description']>('')
    this.statesForCountry$ = of([])
    this.countries$ = combineLatest([this.countryControl.valueChanges, this.service.getCountries]).pipe(
      map(([userInput, states]) => states.filter(c => this.find(c, userInput))));
    this.statesForCountry$ = this.currentCountry$.asObservable().pipe(switchMap(
      country => this.service.getStatesFor(country.id)));
    this.states$ = combineLatest([this.stateControl.valueChanges, this.statesForCountry$]).pipe(
      map(([userInput, states]) => states.filter(s => this.find(s, userInput))));
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.states$ = this.service.getStatesFor(country.id);
    this.currentCountry$.next(country);
  }
}
