import { UserModel } from "./user.model";

export interface CommentModel {
    author : UserModel,
    content : string,
    likes : number
}