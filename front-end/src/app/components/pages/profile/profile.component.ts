import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserModel } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
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
    constructor(private userService : UserService) {}

    async ngOnInit() {
       this.userProfile = await firstValueFrom(this.userService.getUserProfile(this.uid));
    }

}