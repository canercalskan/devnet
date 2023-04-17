import { Component, OnInit } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
@Component({
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent implements OnInit{
    pollClicked : boolean = false;
    imageSelected : boolean = false;
    displayImage! : File;
    UploadImages : File[] = [];
    // postImageDatas : Uint8Array[] = [];
    constructor (private UserService : UserService , private http : HttpClient) {}

    ngOnInit(): void {
        this.http.post('http://91.107.194.181:5435/api/Post/GetAllPosts' , {}).subscribe(response => {
            console.log(response)
        })
    }
    handleImageSelection(event : any) : void {
        this.displayImage = event.target.files[0];
        this.UploadImages = event.target.files;
        this.imageSelected = true;
        if (this.displayImage) {
            const reader = new FileReader();
            reader.readAsDataURL(this.displayImage);
            reader.addEventListener('load', function(event) {
              document.getElementById('previewImage')!.setAttribute('src', event.target!.result!.toString());
              document.getElementById('previewImage')!.style.display = 'block';
            });

        // for(let i = 0; i < event.target.files.length; i++) {
        //     const file = event.target.files[i];
        //     const reader = new FileReader();
        //     reader.readAsArrayBuffer(file);
        //     reader.onload = () => {
        //         const imageFile = new Uint8Array(reader.result as ArrayBuffer);
        //         this.postImageDatas.push(imageFile);
        //     }
        // }

        // ! image'ları base64 e çevir, postImages arrayine at.
        //   for(let i = 0; i < event.target.files.length; i++) {
        //     const reader = new FileReader();
        //     reader.onload = (event : any) => {
        //         this.postImages.push(event.target.result);
        //     }
        //     reader.readAsDataURL(event.target.files[i])
        //   }
        //   console.log(this.postImages);
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

        const sendData = {
            Title : 'angular test',
            Text : data.Text,
            UploadImages : this.UploadImages
        }
        this.UserService.pushNewPost(sendData);
        this.imageSelected = false;
    }

}