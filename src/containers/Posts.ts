import { IStoreState } from "models/IStoreState";
import { PostActions, addPost, deletePost } from "data/actions/post-actions";
import { Post } from "models/Post";
import { connect } from "react-redux";
import Posts from "views/Posts/Posts";
import { Dispatch } from "redux";

const mapStateToProps = (state: IStoreState) => ({ posts: state.posts || [] });

const mapDispatchToProps = (dispatch: Dispatch<PostActions>) => ({
  addPost: (post: Post) => dispatch(addPost(post)),
  deletePost: (postId: number) => dispatch(deletePost(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);