import { createStore } from 'redux';
import { IStoreState } from 'models/IStoreState';
import { postReducer } from './reducers/post-reducer';
import { posts } from './repository';

const initialState: IStoreState = {
  posts
}

const store = createStore<IStoreState, any, any, any>(postReducer, initialState);