import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  Formulario: FormGroup = this.fb.group({
    correo: [, [Validators.required, Validators.email]],
    pass: [, Validators.required]
  });

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {
// Remocion de los datos guadados en el almacenamiento local
    localStorage.removeItem('idUsuario');
  }

// Funcion login para iniciar sesion con metodo post
  Login() {

    this.data.post('usuario', 'login', this.Formulario.value).subscribe((dato: any) => {
     
      // Verificacion de un ID valido
      if (dato.idUsuario != 0) {
        console.log("exitoso");

        // Guardado del ID en el almacenamiento local
        localStorage.setItem('idUsuario', dato.idUsuario)
        console.log(dato.tipo);
        // Direccion hacia la pagina prncipal
          this.router.navigate(['/lista']);

      } else {

        // Mensaje swal con redireccion a login
        Swal.fire({
          title: 'Error',
          text: "No se ha encontrado al usuario ",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: 'red',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        })
        
      }
    });

  }

}
