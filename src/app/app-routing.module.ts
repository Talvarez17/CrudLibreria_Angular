import { ListaComponent } from './pages/lista/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AuthGuard } from './auth/auth.guard';
import { RegistroComponent } from './pages/registro/registro.component';
import { EditarComponent } from './pages/editar/editar.component';


// ----------------------------------------- Implementacion de rutas con authguard -------------------------------------
const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'login',    component: LoginComponent},
      {path: 'registro',    component: RegistroComponent, canActivate: [AuthGuard]},
      {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
      {path: 'editar/:idAnime', component: EditarComponent, canActivate: [AuthGuard]},
      {path: 'lista', component:ListaComponent, canActivate: [AuthGuard]},
      { path: '**',      redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
