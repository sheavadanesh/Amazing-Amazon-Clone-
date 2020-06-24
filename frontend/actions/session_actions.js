import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

// clear errors action (either before nav to next form, or after reaching form for the first time)
export const clearErrors = () => ({
    type: CLEAR_SESSION_ERRORS,
});

// thunk action creators
export const login = user => dispatch => APIUtil.login(user)
    .then(
        user => dispatch(receiveCurrentUser(user)),
        error => dispatch(receiveErrors(error.responseJSON)),
        // () => dispatch(clearErrors()),
        );

export const signup = user => dispatch => APIUtil.signup(user)
    .then(
        user => dispatch(receiveCurrentUser(user)),
        error => dispatch(receiveErrors(error.responseJSON)),
        // () => dispatch(clearErrors()),
        );

export const logout = () => dispatch => APIUtil.logout()
    .then(() => dispatch(logoutCurrentUser())
    );