import { createStore } from 'redux';
import { themeReducer } from './reducers';

const store = createStore(themeReducer);

export default store;
