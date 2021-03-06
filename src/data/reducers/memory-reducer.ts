import { IStoreState } from "models/IStoreState";
import { MemoryActions } from "data/actions/memory-actions";
import { ADD_MEMORY, DELETE_MEMORY, GET_ALL_MEMORIES } from "data/constants/memory-constants";
import { initialState } from "data/store";

export function memoryReducer(state: IStoreState, action: MemoryActions): IStoreState {
  const memories = [...state.memories];

  switch (action.type) {
    case ADD_MEMORY: {
      return { ...state }
    }
    case DELETE_MEMORY: {
      const index = memories.findIndex(m => m.id === action.memoryId);
      memories.splice(index, (index >= 0) ? 1 : 0);
      return { ...state, memories };
    }
    case GET_ALL_MEMORIES: {
      return {...state, memories: action.memories }
    }
    default: {
      return state;
    }
  }
}

