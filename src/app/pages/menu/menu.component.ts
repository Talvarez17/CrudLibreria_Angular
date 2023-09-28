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
  // Variable booleana para la activacion de opcione crear
  opCrear: boolean = false;

  // Obtencion de los permisos correspondientes a cada usuario
  permisos() {
    this.data.post('usuario', 'traerPermisos',{'idUsuario': localStorage.getItem('idUsuario')}).subscribe((dato: any) => {
      console.log(dato);
      this.Permisos = dato;

      if (dato) {
        const Permisos = dato.map((dato:any) => dato.idPermiso);

        Permisos.forEach((permiso: any) => {

          if (permiso == 1) {
            this.opCrear = true;
          } 
        }); 
      }

    });
  }

}
