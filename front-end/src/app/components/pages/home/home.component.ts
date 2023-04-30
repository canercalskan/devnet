import { Component, OnInit } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom } from "rxjs";
import { PostResponseModel } from "src/app/models/post-response.model";
import { CommentModel } from "src/app/models/comment.model";
import jwtDecode from "jwt-decode";
import { getCookie } from "typescript-cookie";
import { UserModel } from "src/app/models/user.model";
@Component({
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent implements OnInit{
    pollClicked : boolean = false;
    imageSelected : boolean = false;
    displayImage! : File;
    UploadImages : File[] = [];
    currentUserJWTDecoded! : any;
    currentUserID! : string
    currentUserProfile !: UserModel;
    displayName! : string;
    getAttr = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    constructor (private UserService : UserService , private http : HttpClient) {}

    async ngOnInit()  {
        this.currentUserJWTDecoded = jwtDecode(getCookie('user-authenticator-token')!, {header : false})
        this.currentUserID = this.currentUserJWTDecoded[this.getAttr];
        this.currentUserProfile = await firstValueFrom(this.UserService.getUserProfile());
        this.displayName = this.capitalize(this.currentUserProfile.firstName + ' ' + this.currentUserProfile.lastName);
    }

    capitalize(str : string) : string {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    handleImageSelection(event : any) : void {
        this.displayImage = event.target.files[0];
        this.UploadImages = event.target.files;
        this.imageSelected = true;
        if (this.displayImage) {
            const reader = new FileReader();
            reader.readAsDataURL(this.displayImage);
            reader.addEventListener('load', function(event) {
              document.getElementById('previewImage')!.setAttribute('src', event.target!.result!.toString());
              document.getElementById('previewImage')!.style.display = 'block';
            });
        }
    }

    removeSelectedImage () : void {
        this.imageSelected = false;
    }

    openPoll() : void {
        this.pollClicked = true;
    }

    removePoll() : void {
        this.pollClicked = false
    }

   async handlePostSubmission(data : PostModel) {
        Swal.fire({
            title : 'Uploading',
            text : 'Please wait a while..',
            allowEscapeKey : false,
            allowOutsideClick : false,
            didOpen : () => {
                Swal.showLoading()
            }
          })
        if(this.pollClicked) {
            data.question1_results = 0;
            data.question2_results = 0;
        }
        data.UploadPhotos = this.UploadImages;
        this.UserService.pushNewPost(data);
        this.imageSelected = false;
    }
}

