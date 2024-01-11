import * as ActionTypes from '../ActionTypes';
import { createAction } from './ActionCreator';
import { errorKeys } from '../Reducers/Error';

export const throwError = createAction(ActionTypes.THROW_ERROR, (message: errorKeys) => ({
    type: ActionTypes.THROW_ERROR,
    payload: {
        message
    }
}));

export const solveError = createAction(ActionTypes.SOLVE_ERROR);