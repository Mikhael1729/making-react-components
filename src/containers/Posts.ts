import { IStoreState } from "models/IStoreState";
import { MemoryActions, addMemory, deleteMemory } from "data/actions/post-actions";
import { Memory } from "models/Post";
import { connect } from "react-redux";
import Memories from "views/Posts/Memories";
import { Dispatch } from "redux";

const mapStateToProps = (state: IStoreState) => ({ posts: state.memories || [] });

const mapDispatchToProps = (dispatch: Dispatch<MemoryActions>) => ({
  addPost: (post: Memory) => dispatch(addMemory(post)),
  deletePost: (postId: number) => dispatch(deleteMemory(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Memories);