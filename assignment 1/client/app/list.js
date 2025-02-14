import productService from "./product.service.mock.js";

console.log('we are on the product list page');

const params = new URL(document.location).searchParams;
// Add records for pagination test
let recCount = params.get("records");
if (recCount !== null) {
    let products = [];
    for (let index = 0; index < recCount; index++) {
        products.push({
            "name": `Product ${index}`,
            "description": "Sample product",
            "stock": 100,
            "price": 29.99
        });
    }
    productService.saveProduct(products);
}

/* DOM Elements */
const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('animal-list'); // Note: Consider renaming this ID
const eleWaiting = document.getElementById('waiting');
const errorMessage = document.getElementById('error-message');

let recordPage = {
    page: Number(params.get('page') ?? 1),
    perPage: Number(params.get('perPage') ?? 7)
};

try {
    const { records, pagination } = await productService.getProductPage(recordPage);
    eleWaiting.classList.add('d-none');

    if (!records.length) {
        eleEmpty.classList.remove('d-none');
        eleTable.classList.add('d-none');
    } else {
        eleEmpty.classList.add('d-none');
        eleTable.classList.remove('d-none');
        drawProductTable(records);
        drawPagination(pagination);
    }
} catch (ex) {
    eleWaiting.classList.add('d-none');
    errorMessage.innerHTML = ex;
    errorMessage.classList.remove('d-none');
}

/* Pagination Functions */
function drawPagination({ page = 1, perPage = 5, pages = 10 }) {
    const pagination = document.getElementById('pagination');
    if (pages > 1) {
        pagination.classList.remove('d-none');
    }
    
    const ul = document.createElement("ul");
    ul.classList.add('pagination');
    
    // Previous button
    ul.insertAdjacentHTML('beforeend', `
        <li class="page-item ${page === 1 ? 'disabled' : ''}">
            <a class="page-link" href="./list.html?page=${page - 1}&perPage=${perPage}">Previous</a>
        </li>
    `);

    // Page numbers
    for (let i = 1; i <= pages; i++) {
        ul.insertAdjacentHTML('beforeend', `
            <li class="page-item ${i === page ? 'active' : ''}">
                <a class="page-link" href="./list.html?page=${i}&perPage=${perPage}">${i}</a>
            </li>
        `);
    }

    // Next button
    ul.insertAdjacentHTML('beforeend', `
        <li class="page-item ${page === pages ? 'disabled' : ''}">
            <a class="page-link" href="./list.html?page=${page + 1}&perPage=${perPage}">Next</a>
        </li>
    `);

    pagination.innerHTML = '';
    pagination.append(ul);
}

/* Product Table Functions */
function drawProductTable(products) {
    const tbody = eleTable.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows

    for (let product of products) {
        const row = tbody.insertRow();
        
        // Product Data Cells
        row.insertCell().textContent = product.name;
        row.insertCell().textContent = product.description;
        row.insertCell().textContent = product.stock;
        row.insertCell().textContent = `$${product.price.toFixed(2)}`;

        // Action Buttons Cell
        const actionCell = row.insertCell();
        actionCell.classList.add('text-nowrap');

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger mx-1';
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
        deleteBtn.addEventListener('click', () => handleDeleteProduct(product.name));
        actionCell.append(deleteBtn);

        // Edit Button
        const editBtn = document.createElement('a');
        editBtn.className = 'btn btn-primary mx-1';
        editBtn.innerHTML = '<i class="fa fa-edit"></i>';
        editBtn.href = `./product.html?name=${encodeURIComponent(product.name)}`;
        actionCell.append(editBtn);
    }
}

/* Event Handlers */
async function handleDeleteProduct(productName) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await productService.deleteProduct(productName);
            window.location.reload();
        } catch (error) {
            errorMessage.textContent = `Error deleting product: ${error}`;
            errorMessage.classList.remove('d-none');
        }
    }
}