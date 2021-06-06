const initialState = {
    cartItems: [],
    loggedInUser: [],
    error: {},
};

export const foodReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'ADD_TO_CART': {
            let newState = {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
            return newState;
        }

        case 'REMOVE_FROM_CART': {
            let newState = {
                ...state,
                cartItems: [...state.cartItems.filter(data => data._id !== action.payload._id)]
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}