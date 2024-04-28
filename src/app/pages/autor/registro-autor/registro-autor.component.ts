import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-autor',
  templateUrl: './registro-autor.component.html',
  styleUrls: ['./registro-autor.component.css']
})
export class RegistroAutorComponent {



  Formulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.maxLength(99)]],
    apellido: [, [Validators.required, Validators.maxLength(99)]],
    nacionalidad: [, [Validators.required, Validators.maxLength(99)]],
    fecha: [Validators.required]
  });


  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {

  }

  // Verificacion de los campos del formularios
  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  // Guardado de los datos del formulario

  guardar() {
    this.data.post('autor', 'agregar', this.Formulario.value).subscribe((dato: any) => {

      if (dato) {
        Swal.fire({
          title: 'Exito',
          text: "Se ha agregado un nuevo autor",
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
    },
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
