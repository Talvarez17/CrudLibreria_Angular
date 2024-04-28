import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  baseUrl = 'http://localhost:5245/api/';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8; Access-Control-Allow-Origin'
    })
  };

  constructor(private http: HttpClient) { }
  
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
