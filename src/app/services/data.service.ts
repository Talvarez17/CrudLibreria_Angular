import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


// URL BASE de los servicios
  baseUrl = 'http://localhost/sistemasAbiertos/controller/';
  // baseUrl = 'http://demotom.orgfree.com/sistemasAbiertos/controller/';

  constructor(private http: HttpClient) { }
//Metodo get para la obtencion y envio de datos
  get(model: string, action: string) {
    return this.http.get(`${this.baseUrl}${model}.php?option=${action}`);
  }
//Metodo post para la obtencion y envio de datos

  post(model: string, action: string, datos: any) {
    return this.http.post(`${this.baseUrl}${model}.php?option=${action}`, datos);
  }
}
