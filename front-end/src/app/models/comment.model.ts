import { UserModel } from "./user.model";

export interface CommentModel {
    id : string,
    userId : string,
    postId : string,
    text : string,
    likes : number,
    time : string,
    timediff : string
}