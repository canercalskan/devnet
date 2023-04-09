import { Component } from "@angular/core";

@Component({
    selector : 'profile-sidebar',
    templateUrl : './profile-sidebar.component.html',
    styleUrls : ['./profile-sidebar.component.css']
})

// if current user navigates his/her own profile, sidebar will be shown, otherwise the sidebar will stay unvisible.

export class ProfileSidebar {}