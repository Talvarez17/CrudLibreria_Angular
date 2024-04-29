import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  // Inicializacion de un arreglo para los datos de autores usado en el slect
  Autores: any = [];


  constructor(private data: DataService, private fb: FormBuilder, private router: Router, private activeRouter: ActivatedRoute) {
    // Obtencion de párametros e inicializacion de funciones
    const idLibro = this.activeRouter.snapshot.params['id'];
    this.obtenerRegistro(idLibro);
    this.lista();
  }

  // Formulario y validacion de los datos

  Formulario: FormGroup = this.fb.group({
    id: [],
    nombre: [, [Validators.required, Validators.maxLength(99)]],
    sinopsis: [, [Validators.required, Validators.maxLength(255)]],
    editorial: [, [Validators.required, Validators.maxLength(99)]],
    fecha: [Validators.required],
    autor: [, [Validators.required, Validators.maxLength(255)]],
    idusuario: []
  });


  // Funcion de verificacion de llenado correcto de los campos del formulario
  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  // Obrencion de los datos de usuario e inclusion en arreglo
  lista() {
    this.data.get('autor', 'obtener', 'todo').subscribe((dato: any) => {
      this.Autores = dato.reverse();
    });
  }

  // Funcion de obtencion de datos y parchado del formulario por metodo get
  obtenerRegistro(idLibro: any) {
    this.data.get('libro', 'id', idLibro).subscribe((dato: any) => {

      this.Formulario.patchValue({
        id: dato[0].id,
        nombre: dato[0].nombre,
        sinopsis: dato[0].sinopsis,
        editorial: dato[0].editorial,
        fecha: dato[0].fecha.split('T')[0],
        autor: dato[0].autor,
        idusuario: dato[0].idusuario
      });
    });

  }

  // Funcion de guardado de los elemento escritos en el formulario por medio del metodo post
  guardar() {
    this.data.put('libro', 'editar', this.Formulario.value).subscribe((dato: any) => {

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
