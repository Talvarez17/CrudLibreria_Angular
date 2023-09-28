import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  Lista: any = [];
  Permisos: any = [];


  constructor(private data: DataService) {
    this.listaAnimes();
    this.permisos();
  }

  //Obtencion de la lista de animes

  listaAnimes() {
    this.data.get('animes', 'traerAnimes').subscribe((dato: any) => {
      console.log(dato);
      this.Lista = dato;

    });
  }

  btnLeer: boolean = false;
  btnActualizar: boolean = false;
  btnEliminar: boolean = false;

  permisos() {
    this.data.post('usuario', 'traerPermisos',{'idUsuario': localStorage.getItem('idUsuario')}).subscribe((dato: any) => {
      console.log(dato);
      this.Permisos = dato;

      if (dato) {
        const Permisos = dato.map((dato:any) => dato.idPermiso);

        Permisos.forEach((permiso: any) => {

          if (permiso == 2) {
            this.btnLeer = true;

          } else if (permiso == 3) {
            this.btnActualizar = true;

          } else if (permiso == 4) {
            this.btnEliminar = true;

          }
        });
        
      } else {
        alert('No pudimos obtener el usuario.');
      }

    });
  }

  eliminar(idAnime: any) {
    // Alertas de swal
    Swal.fire({
      title: '¿Quieres eliminar este anime?',
      text: "No podras recuperarlo después",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
  // Envio de datos con el metodo post para la eliminacion de un elemento por medio del ID

        this.data.post('animes', 'eliminarAnime', { 'idAnime': idAnime }).subscribe((dato: any) => {
          console.log(dato);

          if (dato.status == true) {

            Swal.fire({
              title: 'Exito',
              text: "Se ha eliminado el anime de la lista",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: 'red',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })

          } else if (dato.code == 23000) {
            Swal.fire({
              title: 'Error',
              text: "No puede eliminar esta actividad, ya ha sido asignada a un alumno",
              icon: 'error',
              showCancelButton: false,
              confirmButtonColor: 'red',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed) {
              }
            })

          }
        });

      }
    })

  }


}
