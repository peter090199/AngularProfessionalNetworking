import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private router: Router) {}
  
  canActivate(): boolean {
    // Check if the token exists (or use an authentication service to verify)
    const token = localStorage.getItem('token');
    
    if (token) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigate(['/homepage']); // Redirect to sign-in page if not authenticated
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/homepage']);
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
