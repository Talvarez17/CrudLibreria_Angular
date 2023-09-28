import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  Permisos: any = [];

  constructor(private data: DataService) {
    this.permisos();
  }

  permisos() {
    this.data.post('usuario', 'traerPermisos',{'idUsuario': localStorage.getItem('idUsuario')}).subscribe((dato: any) => {
      console.log(dato);
      this.Permisos = dato;

    });
  }

}
