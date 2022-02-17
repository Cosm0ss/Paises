import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li{
    cursor: pointer;
  }
  `
  ]
})
export class PorPaisComponent   {

  public termino: string = '';
  public hayError: boolean = false;
  public paises: Country[] = [];

  public paisesSugeridos: Country[] = [];
  public mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService) { }

  buscar( termino: string ){
    
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    this.paisService.buscarPais( this.termino )
      .subscribe(
      {
        next: (paises) => {

          this.paises = paises
          console.log(paises);
          
        },
        error: () => {
          this.hayError = true;
          this.paises = [];
        }
      })
  }

  sugerencias( termino: string){

    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
      .subscribe({
        next: ( paises ) => {          
          this.paisesSugeridos = paises.splice(0,5);
          
        },
        error: (e) => {
          this.paisesSugeridos = [];
        }
      })
  }

  buscarSugerido( termino: string ){
    this.buscar( termino );

  }
}
