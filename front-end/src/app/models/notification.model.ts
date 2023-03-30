import { UserModel } from "./user.model";

export interface NotificationModel {
    type : string,
    notifier : UserModel,
}