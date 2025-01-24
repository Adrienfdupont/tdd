const { calculatePriceWithVAT, calculateShippingFees, getCartSummary } = require('../src/exo');
// 1
describe('calculatePriceWithVAT', () => {
    test('Should throw an error if price is missing', () => {
        const articles = [
            {
                'id': 1,
                'name': 'Harry Potter',
                'category': 'livres',
                'quantity': 1,
            },
        ];
        expect(() => calculatePriceWithVAT(articles)).toThrow('Uncomplete article');
    });

    test('Should throw an error if quantity is missing', () => {
        const articles = [
            {
                'id': 1,
                'name': 'Harry Potter',
                'price': 12.99,
                'category': 'livres',
            },
        ];
        expect(() => calculatePriceWithVAT(articles)).toThrow('Uncomplete article');
    });

    test('Should throw an error if category is missing', () => {
        const articles = [
            {
                'id': 1,
                'name': 'Harry Potter',
                'price': 12.99,
                'quantity': 1,
            },
        ];
        expect(() => calculatePriceWithVAT(articles)).toThrow('Uncomplete article');
    });
    
    test('Should return the price with VAT for a video game and a book', () => {
        const articles = [
            {
                'id': 12,
                'name': 'Cyberpunk 2077',
                'price': 49.99,
                'category': 'jeux vidéo',
                'quantity': 1
            },
            {
                'id': 4,
                'name': 'Le Seigneur des Anneaux',
                'price': 15.49,
                'category': 'livres',
                'quantity':1
            },
        ];
        expect(calculatePriceWithVAT(articles)).toBe(76.33);
    });
});

// 2
describe('calculateShippingFees', () => {
    test('Should throw an error if total price is missing', () => {
        const totalPrice = undefined;
        expect(() => calculateShippingFees(totalPrice)).toThrow('Total price is missing');
    });

    test('Should return delivery fees when total price is less than 50', () => {
        const totalPrice = 40;
        expect(calculateShippingFees(totalPrice)).toBe(10);
    });

    test('Should return delivery fees when total price is greater than 49 and less than 100', () => {
        const totalPrice = 60;
        expect(calculateShippingFees(totalPrice)).toBe(5);
    });

    test('Should return 0 delivery fees when total price is greater than 99', () => {
        const totalPrice = 100;
        expect(calculateShippingFees(totalPrice)).toBe(0);
    });
});

describe('get cart summary', () => {
    test('Should return cart summary with total price and shipping fees', () => {
        const articles = [
            {
                'id': 5,
                'name': 'Interstellar',
                'price': 18.99,
                'category': 'dvd',
                'quantity': 2,
            },
            {
                'id': 12,
                'name': 'The Last of Us Part II',
                'price': 69.99,
                'category': 'jeux vidéo',
                'quantity': 1
            },
            {
                'id': 4,
                'name': 'Le Seigneur des Anneaux',
                'price': 15.49,
                'category': 'livres',
                'quantity':1
            },
        ];
        expect(getCartSummary(articles)).toEqual(
            {
                total: 142.11,
                shippingFees: 0,
                totalWithShippingFees: 142.11,
            }
        );
    });
});
