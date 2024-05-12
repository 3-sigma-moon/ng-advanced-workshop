import {Component} from '@angular/core';
import {Observable, startWith} from 'rxjs';
import {Country, State} from './types';
import {CountryService} from './country.service';
import {FormControl} from "@angular/forms";
import {map, withLatestFrom} from "rxjs/operators";

@Component({
  selector: 'app-exercise3',
  templateUrl: './exercise3.component.html',
  styleUrls: ['./exercise3.component.css']
})
export class Exercise3Component {

  countries$: Observable<Country[]> = this.service.getCountries();
  states$: Observable<State[]>;
  country!: Country;
  state!: State;
  countryFormControl: FormControl<Country['description']>
  filteredCountries$: Observable<Country[]>
  filterResults$: Observable<string>

  constructor(private service: CountryService) {
    this.countryFormControl = new FormControl<Country['description']>('')
    this.filterResults$ = this.countryFormControl.valueChanges.pipe(startWith(''))
    this.filteredCountries$ = this.filterResults$.pipe(
      withLatestFrom(this.countries$),
      map(([searchText, countries]) =>
        countries.filter(c => c.description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)))
  }

  updateStates(country: Country) {
    this.country = country;
    this.states$ = this.service.getStatesFor(country.id);
  }

}
