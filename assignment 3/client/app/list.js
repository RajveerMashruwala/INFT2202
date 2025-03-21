import productService from "./product.service.js";

document.addEventListener('DOMContentLoaded', async () => {
    const loading = document.getElementById('loading');
    const errorAlert = document.getElementById('error-alert');
    const table = document.getElementById('product-list');
    const tbody = table.querySelector('tbody');
    
    try {
        const params = new URLSearchParams(window.location.search);
        const { records, pagination } = await productService.getProductPage({
            page: Number(params.get('page')) || 1,
            perPage: Number(params.get('perPage')) || 7
        });

        loading.style.display = 'none';
        
        if (records.length === 0) {
            document.getElementById('empty-message').classList.remove('d-none');
            return;
        }

        table.classList.remove('d-none');
        drawProductTable(records);
        drawPagination(pagination);
    } catch (error) {
        loading.style.display = 'none';
        errorAlert.textContent = error.message;
        errorAlert.style.display = 'block';
    }
});

function drawPagination(pagination) {
    const container = document.getElementById('pagination');
    container.innerHTML = '';
    
    const ul = document.createElement('ul');
    ul.className = 'pagination';
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${pagination.page === 1 ? 'disabled' : ''}`;
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.href = `./list.html?page=${pagination.page - 1}&perPage=${pagination.perPage}`;
    prevLink.textContent = 'Previous';
    prevLi.appendChild(prevLink);
    ul.appendChild(prevLi);

    // Page numbers
    for (let i = 1; i <= pagination.pages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === pagination.page ? 'active' : ''}`;
        const link = document.createElement('a');
        link.className = 'page-link';
        link.href = `./list.html?page=${i}&perPage=${pagination.perPage}`;
        link.textContent = i;
        li.appendChild(link);
        ul.appendChild(li);
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${pagination.page === pagination.pages ? 'disabled' : ''}`;
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = `./list.html?page=${pagination.page + 1}&perPage=${pagination.perPage}`;
    nextLink.textContent = 'Next';
    nextLi.appendChild(nextLink);
    ul.appendChild(nextLi);

    container.appendChild(ul);
}

function drawProductTable(products) {
    const tbody = document.querySelector('#product-list tbody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>${product.desc}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn" data-name="${product.name}">
                    <i class="fas fa-trash"></i>
                </button>
                <a href="./product.html?name=${product.name}" class="btn btn-primary btn-sm">
                    <i class="fas fa-edit"></i>
                </a>
            </td>
        `;
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this product?')) {
                try {
                    await productService.deleteProduct(btn.dataset.name);
                    window.location.reload();
                } catch (error) {
                    document.getElementById('error-alert').textContent = error.message;
                    document.getElementById('error-alert').style.display = 'block';
                }
            }
        });
    });
}