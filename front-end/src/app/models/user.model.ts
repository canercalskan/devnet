export interface UserModel {
    email : string;
    username : string;
    firstName : string;
    lastName : string;
    password : string;
    gender : string;
    age : number;
    country : string;
    friends : UserModel[];
    status : string;
    profile_picture : string;
}