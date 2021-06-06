export const setLoggedInUser = (payload) => {
    return {
        type: 'SET_LOGGED_IN_USER',
        payload: payload,
    }
}