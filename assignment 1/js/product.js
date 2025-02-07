const product = {
    name: "Cool Guy Fedora",
    description: "A hat to wear on your head to attract people.",
    stock: 35,
    price: 39.95
};

document.getElementById('product-container').innerHTML = `
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>Stock: ${product.stock}</p>
    <p>Price: $${product.price.toFixed(2)}</p>
`;
