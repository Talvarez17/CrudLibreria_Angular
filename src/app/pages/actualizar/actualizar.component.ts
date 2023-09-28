import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})


export class ActualizarComponent {
  Lista: any = [];

  constructor(private data: DataService) {
    this.listaAnimes();
  }

  // Funcion para obtener la lista de animes
  listaAnimes() {
    this.data.get('animes', 'traerAnimes').subscribe((dato: any) => {
      console.log(dato);
      this.Lista = dato;

    });
  }



}
