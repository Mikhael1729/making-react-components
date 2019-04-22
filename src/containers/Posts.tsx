import { IStoreState } from "models/IStoreState";
import { Dispatch } from "redux";
import { PostActions, addPost, deletePost } from "data/actions/post-actions";
import { Post } from "models/Post";
import { connect } from "react-redux";
import Posts from "views/Posts/Posts";

export function mapStateToProps({ posts }: IStoreState) {
  return { posts }
}

export function mapDispatchToProps(dispatch: Dispatch<PostActions>) {
  return {
    addPost: (post: Post) => dispatch(addPost(post)),
    deletePost: (postId: number) => dispatch(deletePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);