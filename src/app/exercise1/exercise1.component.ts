import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { Observable } from 'rxjs';
import {State} from "./state";
import {CountryService} from "./country.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})
export class Exercise1Component implements OnInit {
  countries$:Observable<Country[]>
  states$:Observable<State[]>
  countryFormControl:FormControl<Country['id']>
  constructor(private service:CountryService) {
    this.countries$=service.getCountries()
    this.countryFormControl=new FormControl<Country['id']>('')
    this.states$=service.getStates()
  }

  ngOnInit() {
  }

}
