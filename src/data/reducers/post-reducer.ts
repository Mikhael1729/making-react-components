import { IStoreState } from "models/IStoreState";
import { PostType } from "data/actions/post-actions";
import { ADD_POST, DELETE_POST } from "data/constants/post-constants";

export function postReducer(state: IStoreState, action: PostType): IStoreState {
  const posts = [...state.posts];

  switch (action.type) {
    case ADD_POST: {
      posts.push(action.post);
      return { ...state, posts }
    }
    case DELETE_POST: {
      const index = posts.findIndex(p => p.id === action.postId);
      posts.splice(index, (index >= 0) ? 1 : 0);
      return { ...state, posts }
    }
    default: {
      return state
    }
  }
}

