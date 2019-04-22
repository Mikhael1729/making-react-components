import { createStore } from 'redux';
import { IStoreState } from 'models/IStoreState';
import { postReducer } from './reducers/post-reducer';

const initialState: IStoreState = {
  posts: []
}

const store = createStore<IStoreState, any, any, any>(postReducer, initialState);