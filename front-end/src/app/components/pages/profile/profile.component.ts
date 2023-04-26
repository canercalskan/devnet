import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserModel } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
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
    userProfile! : UserModel;
    uid! : string;
    constructor(private userService : UserService , private router : Router) {}

    async ngOnInit() {
       Swal.showLoading()
       try {
           this.userProfile = await firstValueFrom(this.userService.getUserProfile(this.uid));
       }
       catch (error : any) {
            console.log(error.code);
            Swal.fire('No Such Profile' , '' , 'error').then(() => {
                this.router.navigateByUrl('home');
            })
       }

    }

}