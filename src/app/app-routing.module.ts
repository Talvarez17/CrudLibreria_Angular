import { ListaComponent } from './pages/libreria/lista/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/usuario/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RegistroComponent } from './pages/libreria/registro/registro.component';
import { EditarComponent } from './pages/libreria/editar/editar.component';
import { RegistrateComponent } from './pages/usuario/registrate/registrate.component';
import { RegistroAutorComponent } from './pages/autor/registro-autor/registro-autor.component';
import { EditarAutorComponent } from './pages/autor/editar-autor/editar-autor.component';
import { ListaAutorComponent } from './pages/autor/lista-autor/lista-autor.component';


// ----------------------------------------- Implementacion de rutas con authguard -------------------------------------
const routes: Routes = [
  {
    path: '',
    children: [
      // Rutas de inicio de sesion y creacion de usuarios
      {path: 'login', component: LoginComponent },
      {path: 'resgistrarUsuario', component: RegistrateComponent },
      
      // Rutas manejadoras de libros      
      {path: 'registro', component: RegistroComponent, canActivate: [AuthGuard] },
      {path: 'editar/:id', component: EditarComponent, canActivate: [AuthGuard]},
      {path: 'lista', component: ListaComponent, canActivate: [AuthGuard] },

      //Rutas manejadoras de autores
      {path: 'registroAutor', component: RegistroAutorComponent, canActivate: [AuthGuard] },
      {path: 'editarAutor/:idAutor', component: EditarAutorComponent, canActivate: [AuthGuard]},
      {path: 'listaAutor', component: ListaAutorComponent, canActivate: [AuthGuard] },

      //Ruta predefinida de redireccion
      {path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
