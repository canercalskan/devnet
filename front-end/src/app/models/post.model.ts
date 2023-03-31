import { CommentModel } from "./comment.model"
import { UserModel } from "./user.model"

export interface PostModel {
    author : UserModel,
    date : string,
    content : string,
    likes : number,
    comments : CommentModel[],
    contentImage : File,
    contentImageURL : string
}