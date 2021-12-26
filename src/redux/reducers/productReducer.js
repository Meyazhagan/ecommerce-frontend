const getIndex = (arr, id) => arr.findIndex((ele) => ele._id === id);

const initialProduct = {
    allProducts: [],
    related: [],
    current: {},
};

const productReducer = (state = initialProduct, action) => {
    switch (action.type) {
        case "SET_ALL_PRODUCTS":
            return {
                ...state,
                allProducts: [...action.products],
            };
        case "SET_RELATED_PRODUCTS": {
            const id = action.id;
            const i = getIndex(state.allProducts, id);
            const related = state.allProducts.filter(
                (p) => p.category === state.allProducts[i]?.category && id !== p._id
            );
            if (i === -1)
                return {
                    ...state,
                    related: [],
                };
            return {
                ...state,
                related,
            };
        }
        case "SET_CURRENT_PRODUCTS": {
            const index = getIndex(state.allProducts, action.id);
            if (index === -1)
                return {
                    ...state,
                    current: {},
                };
            return {
                ...state,
                current: { ...state.allProducts[index], quantity: action.quantity || 0 },
            };
        }
        case "CREATE_PRODUCT":
            return {
                ...state,
                allProducts: [...state.allProducts, action.product],
            };

        case "UPDATE_PRODUCT":
            const index = getIndex(state.allProducts, action.id);
            if (index === -1) return state;
            return {
                ...state,
                allProducts: [
                    ...state.allProducts.slice(0, index),
                    { ...state.allProducts[index], ...action.product },
                    ...state.allProducts.slice(index + 1),
                ],
            };
        case "DELETE_PRODUCT":
            const i = getIndex(state.allProducts, action.id);
            if (i === -1) return state;
            return {
                ...state,
                allProducts: [...state.allProducts.slice(0, i), ...state.allProducts.slice(i + 1)],
            };

        default:
            return state;
    }
};

export default productReducer;
