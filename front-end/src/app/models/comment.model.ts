import { UserModel } from "./user.model";

export interface CommentModel {
    commentID : string,
    author : UserModel,
    content : string,
    likes : number
}