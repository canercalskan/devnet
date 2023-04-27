import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { PostResponseModel } from "src/app/models/post-response.model";
import { UserModel } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { getCookie } from "typescript-cookie";

@Component({
    templateUrl : './posts.component.html',
    styleUrls : ['./posts.component.css'],
    selector : 'posts'
})

export class PostsComponent implements OnInit{
    showCommentLoadingAnimation : boolean = false;
    userProfile! : UserModel;
    timelinePosts! : PostResponseModel[];
    currentUserJWTDecoded : any;
    currentUserID! : string;
    currentUserLikedPosts : string[] = []
    getAttr: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
    constructor(private userService : UserService, private router : Router){}

   async ngOnInit() {
    this.currentUserJWTDecoded = jwtDecode(getCookie('user-authenticator-token')!, {header : false})
    this.currentUserID = this.currentUserJWTDecoded[this.getAttr]
    console.log(this.currentUserID)
        if(this.router.url === '/profile') {
            this.userProfile = await firstValueFrom(this.userService.getUserProfile())
            console.log(this.userProfile)
            this.userProfile.posts = this.userProfile.posts.filter(post => post.text !== null)

            this.userProfile.posts.forEach(post => {
                post.timeDif = this.calculateTimeDiff(post.createdAt);
                post.comments.forEach(comment => {
                    comment.timediff = this.calculateTimeDiff(comment.time);
                })
                post.likes.forEach(like => {
                    if(like.userId === this.currentUserID) {
                        this.currentUserLikedPosts.push(post.id);
                    }
                })
            })
        }

        else {
            this.timelinePosts = (await firstValueFrom(this.userService.getAllPosts())).filter(post => post.text !== null);
            console.log(this.timelinePosts)
            this.timelinePosts.forEach(post => {
                post.timeDif = this.calculateTimeDiff(post.createdAt);
                post.comments.forEach(comment => {
                    comment.timediff = this.calculateTimeDiff(comment.time);
                })
                post.likes.forEach(like => {
                    if(like.userId === this.currentUserID) {
                        this.currentUserLikedPosts.push(post.id);
                    }
                })
            })
        }
    }

    calculateTimeDiff(date : string) : string {
        let timediff = '';
        const createdAt = new Date(date);
        const now = new Date();
        const diffInMs = now.getTime() - createdAt.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
        if(diffInMinutes < 60) {
            timediff = diffInMinutes + ' minutes ago';
        }
        else if(diffInMinutes >= 60 && diffInHours < 24) {
            timediff = diffInHours + ' hours ago';
        }
        else if(diffInHours >= 24 && diffInDays < 7) {
            timediff = diffInDays + ' days ago';
        }
        else if(diffInDays >= 7 && diffInWeeks < 4) {
            timediff = diffInWeeks + ' weeks ago';
        }
        else {
            timediff = '1+ months ago';
        }
        return timediff;
    }

    handleCommentSubmission(comment : any , postID : string) {
        this.showCommentLoadingAnimation = true;
        comment.PostId = postID;
        comment.likes = 0;
        comment.UserId = this.currentUserID;
        console.log(comment);
        // this.UserService.postComment()
    }

    openComments(postID : string) {
        if(this.timelinePosts) {
            this.timelinePosts.find(post => post.id === postID)!.commentsClicked = true;
        }
        else if(this.userProfile) {
            this.userProfile.posts.find(post => post.id === postID)!.commentsClicked = true;
        }
    }
    
    async handlePostLike(PostId : string) {
        if(!this.currentUserLikedPosts.includes(PostId)) {
            const likeResponse = await firstValueFrom(this.userService.likePost(PostId));
            this.currentUserLikedPosts.push(PostId);
        }
        else {
            const unlikeResponse = await firstValueFrom(this.userService.unlikePost(PostId));
            this.currentUserLikedPosts = this.currentUserLikedPosts.filter(id => id !== PostId);
        }
        if(this.router.url === '/profile') {
            this.userProfile = await firstValueFrom(this.userService.getUserProfile());
            this.userProfile.posts.forEach(post => {
                post.timeDif = this.calculateTimeDiff(post.createdAt);
            })
        }
        else {
            this.timelinePosts = (await firstValueFrom(this.userService.getAllPosts())).filter(post => post.text !== null);
            this.timelinePosts.forEach(post => {
                post.timeDif = this.calculateTimeDiff(post.createdAt);
            })
        }
    }
}