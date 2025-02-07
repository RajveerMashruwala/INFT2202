const products = [
    {
        name: "Cool Guy Fedora",
        description: "A hat to wear on your head to attract people.",
        stock: 35,
        price: 39.95
    },
    {
        name: "Stylish Sunglasses",
        description: "Protects your eyes while looking cool.",
        stock: 20,
        price: 24.99
    }
];

const productList = document.getElementById('product-list');
products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${product.name}</strong> - $${product.price.toFixed(2)}`;
    productList.appendChild(li);
});
