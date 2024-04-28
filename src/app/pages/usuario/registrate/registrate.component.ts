import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent {

  Formulario: FormGroup = this.fb.group({
    nombre: [, Validators.required],
    apellido: [, Validators.required],
    correo: [, [Validators.required, Validators.email]],
    contraseña: [, Validators.required]
  })

  activo:boolean = false

  constructor(private fb: FormBuilder, private router: Router, private data: DataService) {
  }

  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  registro() {

    this.activo = true;

    this.data.post('usuario', 'agregar', this.Formulario.value).subscribe((dato: any) => {
      console.log(dato);
      if (dato) {

        Swal.fire({
          title: 'Exito',
          text: "El usuario ha sido registrado",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: 'red',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        })

      } else {
        Swal.fire({
          title: 'Error',
          text: "No se ha podido registrar al usuario",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: 'red',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })

      }

    })

  }

}
