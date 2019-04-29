import Writes from './Writes';
import { addMemory, MemoryActions } from 'data/actions/post-actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Memory } from 'models/Post';

const mapDispatchToProps = (dispatch: Dispatch<MemoryActions>) => ({
  createMemory: (memory: Memory) => dispatch(addMemory(memory)),
})

export default connect(null, mapDispatchToProps)(Writes);
