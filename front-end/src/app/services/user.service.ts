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
import { UserModel } from '../models/user.model';
@Injectable({providedIn: 'root'})
@NgModule()

export class UserService {
    jwtString! : string;
    constructor(private http : HttpClient) {
      if(getCookie('user-authenticator-token')) {
        this.jwtString = getCookie('user-authenticator-token')!;
      }
     }

    pushNewPost(postData : {Title : string , Text : string , UploadImages : File[]}) : void {
      if(getCookie('user-authenticator-token')) {
        this.jwtString = getCookie('user-authenticator-token')!;
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.jwtString}`,
        }),
      };

      const formData : FormData = new FormData();
      formData.append('Title' , postData.Title);
      formData.append('Text' , postData.Text);
      formData.append('UploadImages' , postData.UploadImages[0]);
      

      this.http.post(environment.postPath , formData, httpOptions).pipe(
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
      if(getCookie('user-authenticator-token')) {
        this.jwtString = getCookie('user-authenticator-token')!;
      }
      const httpOptions = {
        headers : new HttpHeaders({
          'Authorization': `Bearer ${this.jwtString}`,
        })
      }
      return this.http.post(environment.likePostPath, {PostId : postID} , httpOptions);
    }

    getUserProfile() : Observable<UserModel> {
      if(getCookie('user-authenticator-token')) {
        this.jwtString = getCookie('user-authenticator-token')!;
      }
      const httpOptions = {
        headers : new HttpHeaders({
          'Authorization': `Bearer ${this.jwtString}`,
        })
      }
      return this.http.post<UserModel>(environment.getUserProfilePath , {} , httpOptions)
    }

    unlikePost(postID : string) : Observable<any> {
      if(getCookie('user-authenticator-token')) {
        this.jwtString = getCookie('user-authenticator-token')!;
      }
      const httpOptions = {
        headers : new HttpHeaders({
          'Authorization': `Bearer ${this.jwtString}`,
        })
      }
      return this.http.post(environment.unlikePostPath , {PostID : postID} , httpOptions)
    }

    // postComment() : Observable<any> {

    // }

    addFriend() : void {}
}