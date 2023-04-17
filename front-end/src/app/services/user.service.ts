import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { removeCookie } from 'typescript-cookie';
import { PostModel } from '../models/post.model';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';
import { CommentModel } from '../models/comment.model';
import { setCookie , getCookie} from 'typescript-cookie';
import { catchError, throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Injectable({providedIn: 'root'})
@NgModule()

export class UserService {
    constructor(private http : HttpClient) { }

    pushNewPost(postData : {Title : string , Text : string , UploadImages : File[]}) : void {
      const jwtString = getCookie('user-authenticator-token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type' : 'multipart/form-data',
          'Authorization': `Bearer ${jwtString}`,
        }),
      };

      const formData : FormData = new FormData();
      formData.append('Title' , postData.Title);
      formData.append('Text' , postData.Text);
      

      this.http.post(environment.postPath , postData, httpOptions).pipe(
        catchError((error : HttpErrorResponse) => {
          console.log(error)
          Swal.fire('Error' , 'Something went wrong, contact us.' , 'error');
          return throwError(() => {})
        })
      ).subscribe(r => {
        console.log(r)
      })
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