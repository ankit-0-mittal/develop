/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';

import { connectRouter } from 'connected-react-router';
import { history } from '../../utils/history';
import errorReducer from 'redux/reducers/errorReducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  const rootReducer = combineReducers({
    errorReducer,
    ...injectedReducers,
    router: connectRouter(history),
  });

  return rootReducer;
}
export default createReducer;
