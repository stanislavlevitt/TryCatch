import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import  chatReducer  from './chat'
import userReducer from './users';
import authReducer from './auth';
import likesReducer from './likes';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  users: userReducer,
  auth: authReducer,
  chat: chatReducer,
  likes: likesReducer
});

export default rootReducer;
