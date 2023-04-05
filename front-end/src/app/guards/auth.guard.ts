import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getCookie } from 'typescript-cookie';
import { Router } from '@angular/router';

@NgModule()

export class MainGuard implements CanActivate {
    constructor(private http : HttpClient , private router : Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       if(getCookie('user-authenticator-token')) {
        return true;
       }
       else {
        this.router.navigateByUrl('join')
        return false;
       }
    }
}

@NgModule()

export class JoinGuard implements CanActivate {
    constructor(private router : Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if(getCookie('user-authenticator-token')) {
            this.router.navigateByUrl('home')
            return false;
        }
        else {
            return true;
        }
    }
}