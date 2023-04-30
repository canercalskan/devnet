import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { removeCookie } from 'typescript-cookie';
import Swal from 'sweetalert2';
import { setCookie , getCookie} from 'typescript-cookie';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { PostResponseModel } from '../models/post-response.model';
import jwtDecode from 'jwt-decode';
import { UserModel } from '../models/user.model';
import { CommentModel } from '../models/comment.model';
@Injectable({providedIn: 'root'})
@NgModule()

export class UserService {
    jwtString! : string;
    constructor(private http : HttpClient) {
      if(getCookie('user-authenticator-token')) {
        this.jwtString = getCookie('user-authenticator-token')!;
      }
     }

    pushNewPost(postData : {Title : string , Text : string , UploadPhotos : File[]}) : void {
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
      for(let i = 0; i < postData.UploadPhotos.length; i++) {
        formData.append('UploadPhotos' , postData.UploadPhotos[i]);
      }

      this.http.post(environment.postPath , formData, httpOptions).pipe(
        catchError((error : HttpErrorResponse) => {
          console.log(error)
          Swal.fire('Error' , 'Something went wrong, contact us.' , 'error');
          return throwError(() => {})
        })
      ).subscribe();
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

  postComment(comment : CommentModel) : Observable<CommentModel> {
    console.log(comment);
      if(getCookie('user-authenticator-token')) {
        this.jwtString = getCookie('user-authenticator-token')!;
      }
      const httpOptions = {
        headers : new HttpHeaders({
          'Authorization': `Bearer ${this.jwtString}`,
        })
      }

      return this.http.post<CommentModel>(environment.commentPath , comment , httpOptions)
    }

    addFriend() : void {}
}