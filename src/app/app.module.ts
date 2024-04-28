import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/usuario/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrateComponent } from './pages/usuario/registrate/registrate.component';
import { RegistroComponent } from './pages/libreria/registro/registro.component';
import { EditarComponent } from './pages/libreria/editar/editar.component';
import { ListaComponent } from './pages/libreria/lista/lista.component';
import { RegistroAutorComponent } from './pages/autor/registro-autor/registro-autor.component';
import { EditarAutorComponent } from './pages/autor/editar-autor/editar-autor.component';
import { ListaAutorComponent } from './pages/autor/lista-autor/lista-autor.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    EditarComponent,
    ListaComponent,
    RegistrateComponent,
    RegistroAutorComponent,
    EditarAutorComponent,
    ListaAutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
