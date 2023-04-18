import { Component, OnInit } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom } from "rxjs";
import { PostResponseModel } from "src/app/models/post-response.model";
import { CommentModel } from "src/app/models/comment.model";
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
    postImages : string[] = []
    timelinePosts! : PostResponseModel[];
    showCommentLoadingAnimation : boolean = false;

    constructor (private UserService : UserService , private http : HttpClient) {}

    ngOnInit(): void {
        this.http.post('http://91.107.194.181:5435/api/Post/GetAllPosts' , {}).subscribe(response => {
            console.log(response)
        })
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

    handlePostSubmission(data : PostModel) : void {
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


        this.UserService.pushNewPost(data);
        this.imageSelected = false;
    }

    openComments(postID : string) : void {
        this.timelinePosts.find(post => post.id === postID)!.commentsClicked = true;
    }

    handleCommentSubmission(comment : CommentModel , postID : string) : void {
        this.showCommentLoadingAnimation = true;
        comment.PostId = postID;
        comment.likes = 0;
        // this.UserService.postComment()
    }
}