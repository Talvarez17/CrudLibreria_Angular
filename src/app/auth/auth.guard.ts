import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      /* Verificacion de la exitencia del ID en el almacenamiento local para la funcionabilidad del guard  */

    if (localStorage.getItem('idUsuario')) {
      return true;
    } 
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}