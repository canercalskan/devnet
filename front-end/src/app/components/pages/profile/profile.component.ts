import { Component } from "@angular/core";
import { UserService } from "src/app/services/user.service";
@Component({
    selector : 'profile',
    templateUrl : './profile.component.html',
    styleUrls : ['./profile.component.css']
})

export class ProfileComponent {
    settingsClicked : boolean = false;
    blockedUsersClicked : boolean = false;
    preferencesClicked : boolean = false;
    privacyClicked : boolean = false;
    constructor(private userService : UserService) {}

}