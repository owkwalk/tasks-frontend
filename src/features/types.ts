export interface PROPS_AUTHEN {
  email: string;
  password: string;
}

export interface PROPS_PROFILE {
  id: number;
  nickName: string;
}

export interface PROPS_NICKNAME {
  nickName: string;
}

export interface PROPS_NEWPOST {
  title: string;
  content: string;
}

export interface PROPS_POST {
  postId: number;
  loginId: number;
  userPost: number;
  title: string;
  content: string;
}
