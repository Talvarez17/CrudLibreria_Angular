import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-autor',
  templateUrl: './editar-autor.component.html',
  styleUrls: ['./editar-autor.component.css']
})
export class EditarAutorComponent {


  constructor(private data: DataService, private fb: FormBuilder, private router: Router, private activeRouter: ActivatedRoute) {
    
    // Obtencion de parametros de la url e inicializando la obtencion de datos
    const idLibro = this.activeRouter.snapshot.params['idAutor'];
    this.obtenerRegistro(idLibro);
  }

  // Formulario y validacion de campos

  Formulario: FormGroup = this.fb.group({
    id: [],
    nombre: [, [Validators.required, Validators.maxLength(99)]],
    apellido: [, [Validators.required, Validators.maxLength(99)]],
    nacionalidad: [, [Validators.required, Validators.maxLength(99)]],
    fecha: [Validators.required]
  });


  // Funcion de verificacion de llenado correcto de los campos del formulario
  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  // Funcion de obtencion de datos y parchado del formulario 
  obtenerRegistro(idLibro: any) {
    this.data.get('autor', 'id', idLibro).subscribe((dato: any) => {

      this.Formulario.patchValue({
        id: dato[0].id,
        nombre: dato[0].nombre,
        apellido: dato[0].apellido,
        nacionalidad: dato[0].nacionalidad,
        fecha: dato[0].fecha.split('T')[0] // Trannformacion de la data para coindidencia de formato
      });
    });

  }

  // Funcion de guardado de los elemento escritos en el formulario por medio del metodo put
  guardar() {
    this.data.put('autor', 'editar', this.Formulario.value).subscribe((dato: any) => {

      if (dato) {
        Swal.fire({
          title: 'Exito',
          text: "Se ha actualizado la información",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: 'red',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/listaAutor']);
          }
        })
      }
    }, // Manejo de errores en la actualizacion
      (error) => {
        if (error.status === 400) {
          Swal.fire({
            title: 'Ups',
            text: 'Parece que algo esta mal, verifica tu datos',
            icon: 'error',
            confirmButtonColor: 'red',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
            }
          });
        }
      })
  }

}
