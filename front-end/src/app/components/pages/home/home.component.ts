import { Component } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
@Component({
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent {
    pollClicked : boolean = false;
    imageSelected : boolean = false;
    selectedImageBase64! : string;
    constructor (private UserService : UserService) {}

    handleImageSelection(event : any) : void {
        //! preview the image after selection and read its file name
        this.imageSelected = true;
        const file : File = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', function(event) {
              document.getElementById('previewImage')!.setAttribute('src', event.target!.result!.toString());
              document.getElementById('previewImage')!.style.display = 'block';
            });

            this.UserService.encodeImageFileAsBase64(file).then(r => {
                this.selectedImageBase64 = r;
            }).catch(error => {
                Swal.fire('Error' , 'Something went wrong while we process your image, please try again and if the problem still arises contact us.' , 'error');
            })
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
        data.contentImage = this.selectedImageBase64;
        this.UserService.pushNewPost(data);
        this.imageSelected = false;
    }

}