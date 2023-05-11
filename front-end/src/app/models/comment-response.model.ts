export interface CommentResponseModel {
    id : string,
    userId : string,
    postId : string,
    authorUserName : string,
    text : string,
    likes : number,
    time : string,
    timediff : string
}