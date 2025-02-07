// Product data
const product = {
    name: "Cool Guy Fedora",
    description: "A hat to wear on your head to attract people.",
    stock: 35,
    price: 39.95
};

// Function to display product info on product.html
function displayProductInfo() {
    const productInfo = document.getElementById('product-info');
    if (productInfo) {
        productInfo.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        `;
    }
}

// Function to display product list on list.html
function displayProductList() {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = `
            <li>${product.name} - $${product.price.toFixed(2)}</li>
        `;
    }
}

// Execute functions on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('product-info')) {
        displayProductInfo();
    }
    if (document.getElementById('product-list')) {
        displayProductList();
    }
});
