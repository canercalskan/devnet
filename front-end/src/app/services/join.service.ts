import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { setCookie } from 'typescript-cookie';
import slugify from 'slugify';

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
          newUser.username = slugify(newUser.first_name + ' ' + newUser.last_name , {lower : true, replacement : '_'})
          
          //check the 'usernames' table if username is available; if not, add a random number at the end until it is unique.

          this.http.post(this.registerPath , newUser , {responseType : 'text'}).subscribe(response => {
            if(response === 'Success.') {
                //if response is success, push the username into the 'usernames' table, we'll control every new user's username if it has already been taken.
                Swal.close();
                Swal.fire('Success!' , 'You can login and use your account, enjoy!' , 'success').then(() => {
                    location.reload();
                })
            }
            else {
                Swal.close();
                Swal.fire('Error' , 'An error occured, please contact us' , 'error').then(() => {
                    return;
                })
            }
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

          this.http.post(this.loginPath , {email , password} , {responseType : 'text'}).subscribe(r => {
            if(r === 'Wrong Password.') {
                Swal.close();
                Swal.fire('Error' , 'Your password is wrong.' , 'error');
            }
            else if(r === 'User not found.'){
                Swal.close();
                Swal.fire('Error' , 'No such user' , 'error');
            }
            else {
                setCookie('user-authenticator-token' , r , {expires : 365});
                Swal.close();
                this.router.navigate(['/home']);
            }
          })
    }    
}