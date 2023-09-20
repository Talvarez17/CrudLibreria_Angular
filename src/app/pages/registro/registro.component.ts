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

  
  Formulario: FormGroup = this.fb.group({
    titulo: [, [Validators.required, Validators.maxLength(99)]],
    descripcion: [, [Validators.required, Validators.maxLength(255)]],
    categoria: [, [Validators.required, Validators.maxLength(99)]],
    imagen: [, [Validators.required, Validators.maxLength(999)]],
    link: [, [Validators.required, Validators.maxLength(255)]],
   
  });

  constructor(private fb: FormBuilder, private data: DataService,  private router: Router ) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  guardar() {
    this.data.post('animes', 'agregarAnime', this.Formulario.value).subscribe((dato: any) => {
      console.log(dato);
      if (['estatus']) {
        Swal.fire({
          title: 'Exito',
          text: "Se ha agregado una anime",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: 'red',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/lista']);          }
        })
        console.log("Exito");
      } else {
        Swal.fire(
          'Error',
          'No se ha podido agregar el anime',
          'warning'
        )
      }
    })
  }

}
