import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from './types';
import {CountryService} from './country.service';
import {FormControl} from '@angular/forms';
import {State} from "../exercise1/state";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css']
})
export class Exercise2Component {

  countries$: Observable<Country[]>;
  countryDropdown:FormControl<Country['id']>;
  statesDropdown :FormControl<State['code']>;
  states$: Observable<State[]>


  constructor(private service: CountryService) {
    this.countries$= this.service.getCountries();
    this.countryDropdown = new FormControl<Country['id']>(null);
    this.statesDropdown = new FormControl<State['code']>(null);
    this.states$ = this.countryDropdown.valueChanges.pipe(switchMap(
      code => this.service.getStatesByCountryCode(code)
    ))
  }

}
