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

  constructor(private data: DataService) {
    this.listaAnimes();
  }

  listaAnimes() {
    this.data.get('animes', 'traerAnimes').subscribe((dato: any) => {
      console.log(dato);
      this.Lista = dato;

    });
  }

  eliminar(idAnime: any) {

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
