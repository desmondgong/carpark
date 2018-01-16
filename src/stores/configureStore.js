import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

const storeFactory = () =>
  applyMiddleware(thunkMiddleware)(createStore)(reducer);
export default storeFactory;
