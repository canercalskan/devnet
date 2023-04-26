import { UserModel } from "./user.model";

export interface CommentModel {
    Id : string,
    UserId : string,
    PostId : string,
    Text : string,
    likes : number,
    Time : string
}