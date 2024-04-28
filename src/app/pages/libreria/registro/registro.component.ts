import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  Lista: any = [];

  //Obtenemos el id del usuario conectado
  id = localStorage.getItem("idUsuario");

  Formulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.maxLength(99)]],
    sinopsis: [, [Validators.required, Validators.maxLength(255)]],
    editorial: [, [Validators.required, Validators.maxLength(99)]],
    fecha: [Validators.required],
    autor: [, [Validators.required, Validators.maxLength(255)]],
    idusuario: [this.id]
  });


  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {
    this.lista();
  }

  // Verificacion de los campos del formularios
  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  lista() {
    this.data.get('autor', 'obtener', 'todo').subscribe((dato: any) => {
      this.Lista = dato.reverse();
    });
  }

  // Guardado de los datos del formulario
  guardar() {
    this.data.post('libro', 'agregar', this.Formulario.value).subscribe((dato: any) => {

      if (dato) {
        Swal.fire({
          title: 'Exito',
          text: "Se ha agregado un nuevo libro",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: 'red',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/lista']);
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
