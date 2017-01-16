import {SAVE_TV_SHOW} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function tvShowReducer(state = initialState.tvShows, action) {
  switch (action.type) {
    case SAVE_TV_SHOW:
      return [...state, objectAssign({}, action.tvShow)];
    default:
      return state;
  }
}
