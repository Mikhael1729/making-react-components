import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getAllMemories, MemoryActions } from 'data/actions/memory-actions';
import { IStoreState } from 'models/IStoreState';
import { Memories as MemoriesComponent } from './Memories';

const mapStateToProps = (state: IStoreState) => ({
  posts: state.memories || []
});

const mapDispatchToProps = (dispatch: Dispatch<MemoryActions>) => ({
  loadMemories: async () => { dispatch(await getAllMemories()) },
});

export const Memories =
  connect(mapStateToProps, mapDispatchToProps)(MemoriesComponent);

