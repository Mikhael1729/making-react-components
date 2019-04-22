import { ADD_POST, DELETE_POST } from "../constants/post-constants";
import { Post } from "models/Post";

export interface IAddPost {
  type: ADD_POST;
  post: Post;
}

export interface IDeletePost {
  type: DELETE_POST;
  postId: number;
}

export type PostActions = IAddPost | IDeletePost;

export function addPost(post: Post): IAddPost {
  return { type: ADD_POST, post }
}

export function deletePost(postId: number): IDeletePost {
  return { type: DELETE_POST, postId }
}