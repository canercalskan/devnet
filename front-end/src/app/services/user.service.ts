import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { removeCookie } from 'typescript-cookie';
import { PostModel } from '../models/post.model';
import Swal from 'sweetalert2';
@Injectable({providedIn: 'root'})
@NgModule()

export class UserService {
    constructor(private http : HttpClient) { }

    pushNewPost(post : PostModel) : void {
        console.log(post);
        //push to the backend through api and close loading alert after the response.
        Swal.close();
    }

    signOut() : void {
        removeCookie('user-authenticator-token');
        location.reload();
    }

    encodeImageFileAsBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64EncodedString = window.btoa(reader.result as string);
            resolve(base64EncodedString);
          };
          reader.readAsBinaryString(file);
          reader.onerror = error => reject(error);
        });
      }

}