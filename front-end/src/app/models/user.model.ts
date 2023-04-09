export interface UserModel {
    email : string;
    username : string;
    first_name : string;
    last_name : string;
    password : string;
    gender : string;
    age : number;
    country : string;
    friends : UserModel[];
    status : string;
    profile_picture : string;
}