import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { UserModel } from "src/app/models/user.model";
@Component({
    selector : 'profile',
    templateUrl : './profile.component.html',
    styleUrls : ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
    settingsClicked : boolean = false;
    blockedUsersClicked : boolean = false;
    preferencesClicked : boolean = false;
    privacyClicked : boolean = false;
    currentUserProfile! : UserModel;
    displayName !: string;
    postCount : number = 0;
    showCommentLoadingAnimation : boolean = false;
    constructor(private userService : UserService , private router : Router) {}

    async ngOnInit() {
        Swal.showLoading()
       try {
           this.currentUserProfile = (await firstValueFrom(this.userService.getUserProfile()));
           this.displayName = this.capitalize(this.currentUserProfile.firstName + ' ' + this.currentUserProfile.lastName);
           Swal.close()
       }
       catch (error : any) {
            console.log(error);
            Swal.fire('No Such Profile' , '' , 'error').then(() => {
                this.router.navigateByUrl('home');
            })
       }
    }

    capitalize(str : string) : string {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}