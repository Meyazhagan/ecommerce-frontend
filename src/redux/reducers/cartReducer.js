const getIndex = (arr, id) => {
    return arr.findIndex((ele) => ele?.product?._id === id);
};

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_CART":
            return [...action.cart];

        case "ADD_TO_CART":
            const index = getIndex(state, action.id);
            if (index === -1) return [...state, action.payload];
            return [...state.slice(0, index), action.payload, ...state.slice(index + 1)];

        case "REMOVE_FROM_CART":
            const i = getIndex(state, action.id);
            if (i === -1) return state;
            return [...state.slice(0, i), ...state.slice(i + 1)];

        default:
            return state;
    }
};

export default cartReducer;
