import Writes from './Writes';
import { addMemory, MemoryActions, deleteMemory } from 'data/actions/memory-actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Memory } from 'models/Post';

const mapDispatchToProps = (dispatch: Dispatch<MemoryActions>) => ({
  deleteMemoryAsync: async (id: number) => { dispatch(await deleteMemory(id)) },
  createMemoryAsync: async (memory: Memory) => { dispatch(await addMemory(memory)) },
})

export default connect(null, mapDispatchToProps)(Writes);