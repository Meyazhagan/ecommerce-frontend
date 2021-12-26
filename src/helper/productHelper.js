export const getQuantityForProduct = (cart, currentProductId) => {
    const index = cart.findIndex((c) => c.product._id === currentProductId);
    if (index === -1) return null;
    return cart[index].quantity;
};
