import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, firstValueFrom, lastValueFrom } from "rxjs";
import { PostResponseModel } from "src/app/models/post-response.model";
import { UserModel } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { getCookie } from "typescript-cookie";
import { CommentModel } from "src/app/models/comment.model";
import Swal from "sweetalert2";

@Component({
    templateUrl : './posts.component.html',
    styleUrls : ['./posts.component.css'],
    selector : 'posts'
})

export class PostsComponent implements OnInit{
    showCommentLoadingAnimation : boolean = false;
    userProfile! : UserModel;
    private postsSubject = new BehaviorSubject<PostResponseModel[]>([]);
    timelinePosts !: PostResponseModel[];
    // timelinePosts$ : Observable<PostResponseModel[]> = this.postsSubject.asObservable();
    currentUserJWTDecoded : any;
    currentUserID! : string;
    currentUserLikedPosts : string[] = [];
    getAttr: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
    constructor(private userService : UserService, private router : Router){}

   async ngOnInit() {
    this.currentUserJWTDecoded = jwtDecode(getCookie('user-authenticator-token')!, {header : false})
    this.currentUserID = this.currentUserJWTDecoded[this.getAttr]
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
        //     this.userService.getAllPosts().subscribe(posts => {
        //         this.postsSubject.next(posts);
        //     })
        //     console.log(this.postsSubject);
        // }
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

   async handleCommentSubmission(comment : CommentModel , postID : string) {
        this.showCommentLoadingAnimation = true;
        comment.PostId = postID;

        try {
            const commentResponse = await lastValueFrom(this.userService.postComment(comment))
        }
        catch (error) {
            console.log(error);
        }
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
            try {
                const likeResponse = await firstValueFrom(this.userService.likePost(PostId));
                this.currentUserLikedPosts.push(PostId);
            }
            catch(error) {
                Swal.fire('Error' , 'Something went wrong, please try again.' , 'error')
            }
        }

        else {
            try {
                const unlikeResponse = await firstValueFrom(this.userService.unlikePost(PostId));
                this.currentUserLikedPosts = this.currentUserLikedPosts.filter(id => id !== PostId);
            }
            catch(error) {
                Swal.fire('Error' ,'Something went wrong, please try again.' , 'error')
            }
        }

        if(this.router.url === '/profile') {
            try {
                this.userProfile = await firstValueFrom(this.userService.getUserProfile());
                this.userProfile.posts.forEach(post => {
                    post.timeDif = this.calculateTimeDiff(post.createdAt);
                })
            }
            catch (error) {
                Swal.fire('Error' , 'Something went wrong, please try again.' , 'error')
            }
        }
        else {
            try {
                this.timelinePosts = (await firstValueFrom(this.userService.getAllPosts())).filter(post => post.text !== null);
                this.timelinePosts.forEach(post => {
                    post.timeDif = this.calculateTimeDiff(post.createdAt);
                })
            }
            catch (error) {
                Swal.fire('Error' , 'Something went wrong, please try again.' , 'error')
            }
        }
    }
}