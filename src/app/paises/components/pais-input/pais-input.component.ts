import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';


@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit  {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';

  public debouncer: Subject<string> = new Subject();
  public termino: string = '';

  constructor() {}

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(400))
    .subscribe( valor => {
      this.onDebounce.emit( valor )
    })
    
  }
  
  buscar(){

    this.onEnter.emit( this.termino );
  }

  teclaPresionada(){

    this.debouncer.next( this.termino );
  }

}
