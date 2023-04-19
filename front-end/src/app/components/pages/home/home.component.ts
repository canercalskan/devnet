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

    async ngOnInit()  {
        this.timelinePosts = (await firstValueFrom(this.UserService.getAllPosts())).filter(post => post.text !== null);
        this.timelinePosts.forEach(post => {
            const createdAt = new Date(post.createdAt);
            const now = new Date();
            const diffInMs = now.getTime() - createdAt.getTime();
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
            if(diffInMinutes < 60) {
                post.timeDif = diffInMinutes + ' minutes ago';
            }
            else if(diffInMinutes >= 60 && diffInHours < 24) {
                post.timeDif = diffInHours + ' hours ago';
            }
            else if(diffInHours >= 24 && diffInDays < 7) {
                post.timeDif = diffInDays + ' days ago';
            }
            else if(diffInDays >= 7 && diffInWeeks < 4) {
                post.timeDif = diffInWeeks + ' weeks ago';
            }
            else {
                post.timeDif = '1+ months ago';
            }
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
        console.log(comment);
        // this.UserService.postComment()
    }

   async handlePostLike(PostId : string) {
        const likeResponse = await firstValueFrom(this.UserService.likePost(PostId));
        console.log(likeResponse);
    }
}