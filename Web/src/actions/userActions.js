import * as types from '../constants/actionTypes';

export function setUser(username) {
  return { type: types.USER_LOGGED_IN, username};
}
