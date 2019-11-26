import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import userReducer from './users';
import authReducer from './auth';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  users: userReducer,
  auth: authReducer,
});

export default rootReducer;