const initialState = {
    loggedInUser: {}
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER': {
            let newState = {
                loggedInUser: [action.payload]
            }
            return newState;

        }
        default: {
            return state;
        }
    }

}