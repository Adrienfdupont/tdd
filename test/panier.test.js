const calculateTotalPrice = require('../src/calculateTotalPrice');

describe('calculateTotalPrice', () => {
    test('should return the total price of items in the cart', () => {
        const cart = [
            { name: 'item1', price: 10, quantity: 2 },
            { name: 'item2', price: 5, quantity: 1 },
            { name: 'item3', price: 20, quantity: 3 }
        ];
        expect(calculateTotalPrice(cart)).toBe(85);
    });

    test('should return 0 when the cart is empty', () => {
        const cart = [];
        expect(calculateTotalPrice(cart)).toBe(0);
    });

    test('should throw an error when there is no cart', () => {
        expect(() => calculateTotalPrice()).toThrow('Cart is required');
    });

    test('should throw an error when the cart contains non-item objects', () => {
        const cart = [
            { name: 'item1', price: 10, quantity: 2 },
            { name: 'item2', price: 5, quantity: 1 },
            { name: 'item3', price: 20, quantity: 3 },
            { name: 'invalidItem', price: 'invalid', quantity: 1 }
        ];
        expect(() => calculateTotalPrice(cart)).toThrow('Invalid item in cart');
    });

    test('should throw an error when an item has a negative price', () => {
        const cart = [
            { name: 'item1', price: -10, quantity: 2 },
            { name: 'item2', price: 5, quantity: 1 }
        ];
        expect(() => calculateTotalPrice(cart)).toThrow('Item price cannot be negative');
    });

    test('should throw an error when an item has a quantity of 0 or negative', () => {
        const cart = [
            { name: 'item1', price: 10, quantity: 0 },
            { name: 'item2', price: 5, quantity: -1 },
            { name: 'item3', price: 20, quantity: 3 }
        ];
        expect(() => calculateTotalPrice(cart)).toThrow('Item quantity must be greater than 0');
    });

    test('should throw an error when an item is out of stock', () => {
        const cart = [
            { name: 'item1', price: 10, quantity: 2, stock: 0 },
            { name: 'item2', price: 5, quantity: 1, stock: 1 }
        ];
        expect(() => calculateTotalPrice(cart)).toThrow('Item is out of stock');
    });

    test('should throw an error when stock is insufficient for the quantity in the cart', () => {
        const cart = [
            { name: 'item1', price: 10, quantity: 5, stock: 3 },
            { name: 'item2', price: 5, quantity: 1, stock: 1 }
        ];
        expect(() => calculateTotalPrice(cart)).toThrow('Insufficient stock for item');
    });
});
