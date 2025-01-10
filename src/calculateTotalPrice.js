function calculateTotalPrice(cart) {
    if (!cart) {
        throw new Error('Cart is required');
    }

    if (!Array.isArray(cart)) {
        throw new Error('Cart must be an array');
    }

    return cart.reduce((total, item) => {
        if (typeof item.price !== 'number' || typeof item.quantity !== 'number') {
            throw new Error('Invalid item in cart');
        }

        if (item.price < 0) {
            throw new Error('Item price cannot be negative');
        }

        if (item.quantity <= 0) {
            throw new Error('Item quantity must be greater than 0');
        }

        if (item.stock === 0 ) {
            throw new Error('Item is out of stock');
        }


        if (item.stock < item.quantity) {
            throw new Error('Insufficient stock for item');
        }

        return total + item.price * item.quantity;
    }, 0);
}

module.exports = calculateTotalPrice;