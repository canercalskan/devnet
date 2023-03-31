import { Component } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { UserService } from "src/app/services/user.service";
@Component({
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent {
    pollClicked : boolean = false;
    imageSelected : boolean = false;
    constructor (private UserService : UserService) {}

    handleImageSelection(event : any) : void {
        //! preview the image after selection and read its file name
        this.imageSelected = true;
        if (event.target.files[0]) {
            var fr = new FileReader();
            fr.readAsDataURL(event.target.files[0]);
            fr.addEventListener('load', function(event) {
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
        //data.author = ?
        //data.contentImageURL = ?
        this.UserService.pushNewPost(data);
    }

}