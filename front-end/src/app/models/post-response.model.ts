import { CommentResponseModel } from "./comment-response.model";
import { CommentModel } from "./comment.model";

export class PostResponseModel {
    id! : string;
    authorFirstName! : string;
    authorLastName! : string;
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