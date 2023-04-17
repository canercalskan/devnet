import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { setCookie , getCookie} from 'typescript-cookie';
import slugify from 'slugify';
import { catchError, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})

@NgModule()

export class JoinService {
    registerPath : string = environment.registerPath;
    loginPath : string = environment.loginPath;

    constructor(private http : HttpClient , private router : Router) {}

    register(newUser : UserModel) : void {
        Swal.fire({
            title : 'Registering..',
            text : 'Please wait a while',
            allowEscapeKey : false,
            allowOutsideClick : false,
            didOpen : () => {
                Swal.showLoading()
            }
          })
          
          this.http.post(this.registerPath , newUser , {observe : 'response'}).subscribe(response => {

            // if(response === 'Success.') {
            //     Swal.close();
            //     Swal.fire('Success!' , 'You can login and use your account, enjoy!' , 'success').then(() => {
            //         location.reload();
            //     })
            // }

            // else {
            //     Swal.close();
            //     Swal.fire('Error' , 'An error occured, please contact us' , 'error').then(() => {
            //         return;
            //     })
            // }
            console.log(response);
          })
    }

    login(email : string , password : string) : void {
        Swal.fire({
            title : 'Logging In..',
            text : 'Please wait a while',
            allowEscapeKey : false,
            allowOutsideClick : false,
            didOpen : () => {
                Swal.showLoading()
            }
          })
        this.http.post(this.loginPath , {email , password}).pipe(
            catchError((error : HttpErrorResponse) => {
                Swal.fire('Error','Invalid username or password','error');
                return throwError(() => {description : 'invalid credentials'});
            })
        ).subscribe((r : any) => {
            setCookie('user-authenticator-token' , r.token);
            Swal.close();
            this.router.navigate(['./home']);
        })
    }    
}