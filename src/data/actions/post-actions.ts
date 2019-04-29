import { ADD_POST, DELETE_POST } from "../constants/post-constants";
import { Memory } from "models/Post";

export interface IAddPost {
  type: ADD_POST;
  post: Memory;
}

export interface IDeletePost {
  type: DELETE_POST;
  postId: number;
}

export type PostActions = IAddPost | IDeletePost;

export function addPost(post: Memory): IAddPost {
  return { type: ADD_POST, post }
}

export function deletePost(postId: number): IDeletePost {
  return { type: DELETE_POST, postId }
}