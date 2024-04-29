import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-autor',
  templateUrl: './lista-autor.component.html',
  styleUrls: ['./lista-autor.component.css']
})
export class ListaAutorComponent {

  // Inicializaion de la lista para los datos de los autores
  Lista: any = [];

  constructor(private data: DataService) {
    this.lista();
  }

  //Obtencion de los datos de los autores por medio de get
  lista() {
    this.data.get('autor', 'obtener', 'todo').subscribe((dato: any) => {
      this.Lista = dato.reverse();
    });
  }

  // funcion de eliminar registro segun su id, primero pide la confirmacion para ejecutar la accion
  eliminar(idAutor: any) {
    Swal.fire({
      title: '¿Quieres eliminar este autor?',
      text: "No podras recuperarlo después",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.data.delete('autor', 'borrar', idAutor).subscribe((dato: any) => {

          if (dato) {

            Swal.fire({
              title: 'Exito',
              text: "Se ha eliminado el autor de la lista",
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
