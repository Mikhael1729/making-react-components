import { createStore } from 'redux';
import { IStoreState } from 'models/IStoreState';
import { memoryReducer } from './reducers/memory-reducer';

export const initialState: IStoreState = {
  memories: []
}

const store = createStore<IStoreState, any, any, any>(memoryReducer, initialState);

export default store;