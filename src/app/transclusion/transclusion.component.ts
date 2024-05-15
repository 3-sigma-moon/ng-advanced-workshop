import {Component, HostBinding, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-transclusion',
  templateUrl: './transclusion.component.html',
  styleUrls: ['./transclusion.component.css']
})

export class TransclusionComponent<T>{

  @Input()
  action:Observable<T>

  @Input()
  state: State='initial';



  @HostListener('click',['$event.target'])
  handleClick(){
    this.state='working'
    this.action.subscribe(()=>{
      this.state='done'

    })
  }
}
export type  State = 'initial' | 'working' | 'done'
