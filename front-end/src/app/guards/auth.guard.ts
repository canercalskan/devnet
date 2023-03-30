import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
@NgModule()

export class AuthGuard implements CanActivate {
    constructor(private http : HttpClient) { }
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>{
    //     return this.checkAuth()
    //   }
    
    //   checkAuth() : Observable<boolean> {

    //     return this.http.post().pipe(map((response) => {
    //         if(response) {
    //             return true
    //         }
    //         else {
    //             return false
    //         }
    //     }))
    //   }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return false;
    }
}

@NgModule()

export class JoinGuard implements CanActivate {
    constructor(){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>{
    //     return this.checkAuth()
    //   }
    
    //   checkAuth() : Observable<boolean> {

    //     return this.http.post().pipe(map((response) => {
    //         if(response) {
    //             return true
    //         }
    //         else {
    //             return false
    //         }
    //     }))
    //   }
        return false;
    }
}