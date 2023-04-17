import { CommentModel } from "./comment.model"
import { UserModel } from "./user.model"

export class PostModel {
    postID! : string;
    author! : UserModel;
    date! : string;
    Title! : string;
    Text! : string;
    likes! : number;
    comments! : CommentModel[];
    UploadImages : File[] = [];
    question1!: string | null;
    question2! : string | null;
    question1_results! : number | null
    question2_results! : number | null
}