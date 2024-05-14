import { Component } from '@angular/core';
import {Observable, switchMap, tap, timer} from 'rxjs';
import {CountryService} from "../exercise4/country.service";
import {State} from "../exercise4/types";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-exercise6',
  templateUrl: './exercise6.component.html',
  styleUrls: ['./exercise6.component.css']
})
export class Exercise6Component  {

  action$ = timer(3000);

}

