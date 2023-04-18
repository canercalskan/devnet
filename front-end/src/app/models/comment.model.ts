import { UserModel } from "./user.model";

export interface CommentModel {
    Id : string,
    UserId : UserModel,
    PostId : string,
    Text : string,
    likes : number,
    Time : string
}