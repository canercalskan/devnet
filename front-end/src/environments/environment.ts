export const environment = {
  production: false,

  //Auth API Paths
  registerPath : 'http://91.107.194.181:5435/api/Auth/Register',
  loginPath : 'http://91.107.194.181:5435/api/Auth/Login',

  //Post API Paths
  getAllPostsPath : 'http://91.107.194.181:5435/api/Post/GetAllPosts',
  postPath : 'http://91.107.194.181:5435/api/Post/CreatePost',
  likePostPath : 'http://91.107.194.181:5435/api/Post/LikePost',
  unlikePostPath : 'http://91.107.194.181:5435/api/Post/UnlikePost',
  commentPath : 'http://91.107.194.181:5435/api/Comment/PostComment',

  //Profile API Paths
  getUserProfilePath : 'http://91.107.194.181:5435/api/UserProfile/GetLoggedInUserProfileInfo',
};


