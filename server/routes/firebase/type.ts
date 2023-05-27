export interface UserType {
  email: string;
  userId: string;
}

export interface CreditsType {
  [k: string]: number;
}

export interface ImageListType {
  url: string;
  id: string;
  arrayBuffer?: ArrayBuffer;
}

export interface NewUserType {
  email: string;
  userId: string;
  image_list: Array<string>;
  credits: number;
}
