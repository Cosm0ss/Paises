import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
        margin-top: 5px;
      }
    `,
  ],
})
export class PorRegionComponent {
  public regiones: string[] = [
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];
  public regionActiva: string = '';
  public paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  getClaseCSS(region: string): string {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  activarRegion(region: string) {

    if (region === this.regionActiva) {
      return;
    }

    this.regionActiva = region;
    this.paises = []

    this.paisService.buscarPorRegion(region).subscribe({
      next: (paises) => {
        this.paises = paises;
      },
      error: (err) => {
        console.error('Ocurrio un error al buscar paises, error: \n', err);
      },
    });
  }
}
