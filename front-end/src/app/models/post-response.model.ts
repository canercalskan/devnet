import { CommentResponseModel } from "./comment-response.model";

export class PostResponseModel {
    id! : string;
    authorFirstName! : string;
    authorLastName! : string;
    authorUserName! : string;
    comments! : CommentResponseModel[];
    createdAt! : string;
    timeDif : string = '';
    photos! : string[];
    title! : string;
    text! : string;
    commentsClicked : boolean = false;
    likes! : {
        id: string;
        time: string;
        userId: string
    }[];
    likesCount !: number;
}