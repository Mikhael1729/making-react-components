import { IStoreState } from "models/IStoreState";
import { MemoryActions, addMemory, deleteMemory } from "data/actions/memory-actions";
import { Memory } from "models/Post";
import { connect } from "react-redux";
import { Memories as MemoriesComponent }  from "./Memories";
import { Dispatch } from "redux";

const mapStateToProps = (state: IStoreState) => ({ posts: state.memories || [] });

const mapDispatchToProps = (dispatch: Dispatch<MemoryActions>) => ({
  addPost: (post: Memory) => dispatch(addMemory(post)),
  deletePost: (postId: number) => dispatch(deleteMemory(postId))
})

export const Memories = 
  connect(mapStateToProps, mapDispatchToProps)(MemoriesComponent);

