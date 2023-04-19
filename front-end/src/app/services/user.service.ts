import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { removeCookie } from 'typescript-cookie';
import { PostModel } from '../models/post.model';
import Swal from 'sweetalert2';
import { setCookie , getCookie} from 'typescript-cookie';
import { Observable, catchError, throwError } from 'rxjs';
import { PostResponseModel } from '../models/post-response.model';
import jwtDecode from 'jwt-decode';
@Injectable({providedIn: 'root'})
@NgModule()

export class UserService {
    jwtString! : string;
    constructor(private http : HttpClient) {
        this.jwtString = getCookie('user-authenticator-token')!;
        console.log(jwtDecode(this.jwtString))
     }

    pushNewPost(postData : {Title : string , Text : string , UploadImages : File[]}) : void {
      // const jwtString = getCookie('user-authenticator-token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type' : 'multipart/form-data',
          'Authorization': `Bearer ${this.jwtString}`,
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

    getAllPosts() : Observable<PostResponseModel[]> {
      return this.http.post<PostResponseModel[]>(environment.getAllPostsPath , {})
    }

    likePost(postID : string) : Observable<any> {
      const httpOptions = {
        headers : new HttpHeaders({
          'Authorization': `Bearer ${this.jwtString}`,
        })
      }
      return this.http.post(environment.likePostPath, {PostId : postID} , httpOptions);
    }

    unlikePost() : void {}
}