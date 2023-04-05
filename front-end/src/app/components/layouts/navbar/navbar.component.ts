import { Component } from "@angular/core";
import { UserService } from "src/app/services/user.service";
@Component({
    selector : 'navbar-timeline',
    templateUrl : './navbar.component.html',
    styleUrls : ['./navbar.component.css']
})

export class NavbarComponent {
    constructor (private UserService : UserService) {}

    handleSignOut() : void {
        this.UserService.signOut();
    }
}