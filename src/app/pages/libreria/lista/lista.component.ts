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

  id = localStorage.getItem("idUsuario");

  constructor(private data: DataService) {
    this.lista();
  }

  //Obtencion de los libros por usuario
  lista() {
    this.data.get('libro', 'idUsuario', this.id).subscribe((dato: any) => {
      this.Lista = dato.reverse();
    });
  }


  eliminar(idLibro: any) {
    Swal.fire({
      title: '¿Quieres eliminar este libro?',
      text: "No podras recuperarlo después",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.data.delete('libro', 'borrar', idLibro).subscribe((dato: any) => {

          if (dato) {

            Swal.fire({
              title: 'Exito',
              text: "Se ha eliminado el libro de la lista",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: 'red',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })

          }
        },
        (error) => {
          if (error.status === 400) {
            Swal.fire({
              title: 'Ups',
              text: 'No se ha podido eliminar el registro',
              icon: 'error',
              confirmButtonColor: 'red',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }
        });

      }
    })

  }

}
