export const calculateOrderBookData = (data) => {
    const buyOrders = data.filter((order) => order.type === "buy")
        .sort((a, b) => b.price - a.price);

    const sellOrders = data.filter((order) => order.type === "sell")
        .sort((a, b) => a.price - b.price);

    let buyTotal = 0;
    let sellTotal = 0;

    const buyData = buyOrders.map((order) => {
        buyTotal += order.quantity;
        return {
            ...order,
            total: buyTotal
        };
    });

    const sellData = sellOrders.map((order) => {
        sellTotal += order.quantity;
        return {
            ...order,
            total: sellTotal
        };
    });

    const maxTotal = Math.max(buyTotal, sellTotal);

    const calculateBgWidth = (total) => {
        return ((total / maxTotal) * 100).toFixed(2) + '%';
    };

    const finalBuyData = buyData.map((order) => ({
        ...order,
        bgWidth: calculateBgWidth(order.total)
    }));

    const finalSellData = sellData.map((order) => ({
        ...order,
        bgWidth: calculateBgWidth(order.total)
    }));

    return {
        buyData: finalBuyData,
        sellData: finalSellData
    };
};