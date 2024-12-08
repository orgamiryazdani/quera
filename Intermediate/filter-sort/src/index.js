function filterAndSortProducts(products, criteria) {
    let filteredProducts = products;

    if (criteria.categories?.length) {
        filteredProducts = filteredProducts.filter((product) =>
            criteria.categories.includes(product.category)
        );
    }

    if (criteria.priceRange?.min !== undefined && criteria.priceRange?.max !== undefined) {
        filteredProducts = filteredProducts.filter(
            (product) => product.price >= criteria.priceRange.min && product.price <= criteria.priceRange.max
        );
    }

    if (criteria.nameLength && criteria.nameLength?.min !== undefined && criteria.nameLength?.max !== undefined) {
        filteredProducts = filteredProducts.filter(
            (product) => product.name.length >= criteria.nameLength.min && product.name.length <= criteria.nameLength.max
        );
    }

    if (criteria.keywords?.length) {
        filteredProducts = filteredProducts.filter((product) =>
            criteria.keywords.some((keyword) => product.name.includes(keyword))
        );
    }

    if (criteria.sortBy?.length) {
        filteredProducts = filteredProducts.sort((a, b) => {
            for (const sortOption of criteria.sortBy) {
                const { field, order } = sortOption;

                if (field === 'price') {
                    if (a.price !== b.price) {
                        return order === 'ascending' ? a.price - b.price : b.price - a.price;
                    }
                }

                if (field === 'name') {
                    const nameLengthDifference = a.name.length - b.name.length;
                    if (nameLengthDifference !== 0) {
                        return order === 'ascending' ? nameLengthDifference : -nameLengthDifference;
                    }
                }
            }
            return 0;
        });
    }


    return filteredProducts;
}

const products = [
    { id: 1, name: "Apple iPhone 12", category: "Electronics", price: 999 },
    { id: 2, name: "Adidas running shoes", category: "Sportswear", price: 280 },
    { id: 3, name: "Samsung Galaxy S21", category: "Electronics", price: 300 },
    { id: 4, name: "Nike Air Max", category: "Sportswear", price: 300 },
];

const criteria = {
    categories: ["Electronics", "Sportswear"],
    priceRange: { min: 200, max: 1000 },
    nameLength: { min: 10, max: 25 },
    keywords: ["Galaxy", "Air"],
    sortBy: [
        { field: "price", order: "ascending" },
        { field: "name", order: "descending" },
    ],
};

const result = filterAndSortProducts(products, criteria);
console.log(result);

module.exports = { filterAndSortProducts };