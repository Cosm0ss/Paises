import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  public hayError: boolean = false;
  public termino: string = '';
  public paises: Country[] = [];
  public placeholder: string = 'Buscar Capital...';

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
  }

  buscar( termino: string ){

    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital( termino )
      .subscribe({
        next: (v) => {
          this.paises = v;
        },
        error: (e) => {
          console.error('Error al buscar capital, error: ', e);
          this.hayError = true;
          this.paises = [];
        }
      })
    
  }

  sugerencias( termino: string ){

    this.hayError = false;
  }
}
