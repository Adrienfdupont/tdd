function calculatePriceWithVAT(articles) {
    const VAT_RATES = {
        'livres': 0.055,
        'dvd': 0.1,
        'jeux vidéo': 0.2,
    };

    return parseFloat(
        articles.reduce((total, article) => {
            if (article.price === undefined || article.quantity === undefined || article.category === undefined) {
                throw new Error('Uncomplete article');
            }
            if (article.price < 0 || article.quantity < 0) {
                return total;
            }
            // ----------------
            const vatRate = VAT_RATES[article.category] || 0;
            const priceWithVAT = article.price * (1 + vatRate) * article.quantity;
            return total + priceWithVAT;
        }, 0).toFixed(2)
    );
}

function calculateShippingFees(totalPrice) {
    if (totalPrice === undefined) {
        throw new Error('Total price is missing');
    }
    if (totalPrice < 50) {
        return 10;
    } else if (totalPrice < 100) {
        return 5;
    } else {
        return 0;
    }
}

function getCartSummary(articles) {
    const totalPrice = calculatePriceWithVAT(articles);
    const delivery_charges = calculateShippingFees(totalPrice);
    const Total_with_delivery = totalPrice + delivery_charges;

    return {
        total: totalPrice,
        shippingFees: delivery_charges,
        totalWithShippingFees: Total_with_delivery
    }
}

module.exports = {
    calculatePriceWithVAT,
    calculateShippingFees,
    getCartSummary
};