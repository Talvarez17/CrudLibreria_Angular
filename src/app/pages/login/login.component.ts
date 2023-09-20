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

    localStorage.removeItem('idUsuario');
  }

  Login() {

    this.data.post('usuario', 'login', this.Formulario.value).subscribe((dato: any) => {
     
      if (dato.idUsuario != 0) {
        console.log("exitoso");

        localStorage.setItem('idUsuario', dato.idUsuario)
        console.log(dato.tipo);
          this.router.navigate(['/lista']);

      } else {

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
