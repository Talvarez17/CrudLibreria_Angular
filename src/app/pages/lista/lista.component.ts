import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  Lista: any = [];

  constructor(private data: DataService) {
    this.listaAnimes();
  }

  //Obtencion de la lista de animes

  listaAnimes() {
    this.data.get('animes', 'traerAnimes').subscribe((dato: any) => {
      console.log(dato);
      this.Lista = dato;

    });
  }

}
