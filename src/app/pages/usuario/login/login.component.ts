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
    contraseña: [, Validators.required]
  });

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {
    // Remocion de los datos guadados en el almacenamiento local
    localStorage.removeItem('idUsuario');
  }

  // Funcion login para iniciar sesion con metodo post
  Login() {

    this.data.post('usuario', 'login', this.Formulario.value).subscribe((dato: any) => {

      // Verificación de un ID válido
      if (dato.id != "") {

        // Guardado del ID en el almacenamiento local
        localStorage.setItem('idUsuario', dato.id);
        console.log(dato.tipo);
        // Dirección hacia la página principal
        this.router.navigate(['/lista']);
      }
    },
      (error) => {
        if (error.status === 500 || error.status === 400) {
          Swal.fire({
            title: 'Usuario no encontrado',
            text: 'Verifique que su correo y contraseña sean correctos',
            icon: 'error',
            confirmButtonColor: 'red',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        }
      }
    );
  }
}