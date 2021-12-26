const orderReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ORDERS":
            return [...action.orders];
        case "CREATE_ORDER":
            return [...state, action.order];
        default:
            return state;
    }
};

export default orderReducer;
