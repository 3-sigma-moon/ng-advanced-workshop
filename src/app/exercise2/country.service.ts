import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from './types';
import {environment} from "../environment";
import {State} from '../exercise1/state';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countries$: Observable<Country[]>;
  private states$: Observable<State[]>;

  constructor(private http: HttpClient) {
    this.countries$ = http.get<Country[]>(environment.COUNTRIES_URL);
    this.states$ = http.get<State[]>(environment.STATES_URL);

  }

  getCountries(): Observable<Country[]> {
    return this.countries$;
  }


  getStatesByCountryCode(code: string): Observable<State[]> {
    return this.http.get<State[]>(environment.STATES_BY_CTR_CODE_URL + code).pipe(
      map(s =>
        s.sort((a, b) =>
          a.description > b.description ? 1 : -1)));
  }
}
