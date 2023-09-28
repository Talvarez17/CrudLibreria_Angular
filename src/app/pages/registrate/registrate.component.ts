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
    correo: [, [Validators.required, Validators.email]],
    pass: [, Validators.required]

  })

  constructor(private fb: FormBuilder, private router: Router, private data: DataService) {

  }

  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  registro() {

    this.data.post('usuario', 'agregarUsuario', this.Formulario.value).subscribe((dato: any) => {
      console.log(dato);
      if (dato.status == true) {

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

      }else if (dato.code == 23000){
        Swal.fire({
          title: 'Error',
          text: "Ya existe un usuario registrado con estos datos",
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
