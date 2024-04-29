import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

// URL al cual accedemos
  baseUrl = 'http://localhost:5245/api/';


  constructor(private http: HttpClient) { }

  // Definicion de los metodo http que utilizaremos, todos reciben el modelo accion y datos para la consulta 
  
  get(model: string, action: string, datos: any) {
    return this.http.get(`${this.baseUrl}${model}/${action}/${datos}`);
  }
  
  delete(model: string, action: string, datos: any) {
    return this.http.delete(`${this.baseUrl}${model}/${action}/${datos}`);
  }

  post(model: string, action: string, datos: any) {
    return this.http.post(`${this.baseUrl}${model}/${action}`, datos);
  }

  put(model: string, action: string, datos: any) {
    return this.http.put(`${this.baseUrl}${model}/${action}`, datos);
  }
}
