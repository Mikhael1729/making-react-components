import { createStore } from 'redux';
import { IStoreState } from 'models/IStoreState';
import { memoryReducer } from './reducers/memory-reducer';
import { posts } from './repository';

export const initialState: IStoreState = {
  memories: posts
}

const store = createStore<IStoreState, any, any, any>(memoryReducer, initialState);

export default store;