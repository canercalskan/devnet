import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscribable } from 'rxjs';
import { PostModel } from '../models/post.model';
@Injectable({providedIn: 'root'})
@NgModule()

export class UserService {
    constructor(private http : HttpClient) { }

    pushNewPost(post : PostModel) : void {
        console.log(post);
    }

}