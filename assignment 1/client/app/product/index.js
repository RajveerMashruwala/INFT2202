import productService from "../product.service.mock.js";

async function productBuilder(name) {
    const form = document.createElement('form');
    let description = 'Add Product';
    let product = null;
    
    // Form creation
    function createContent() {
        if(description === 'No service') return '';
        
        const container = document.createElement('div');
        container.classList.add('mb-2');

        // Name Field
        const nameField = document.createElement('div');
        nameField.classList.add('mb-3');
        const nameInput = product ? 
            `<input type="text" class="form-control" id="name" name="name" value="${product.name}" readonly>` :
            `<input type="text" class="form-control" id="name" name="name">`;
        nameField.innerHTML = `
            <label for="name" class="form-label">Product Name</label>
            ${nameInput}
            <p class="text-danger d-none"></p>
        `;
        container.append(nameField);

        // Description Field
        const descField = document.createElement('div');
        descField.classList.add('mb-3');
        descField.innerHTML = `
            <label for="description" class="form-label">Product Description</label>
            <textarea class="form-control" id="description" name="description">${product?.description || ''}</textarea>
            <p class="text-danger d-none"></p>
        `;
        container.append(descField);

        // Stock Field
        const stockField = document.createElement('div');
        stockField.classList.add('mb-3');
        stockField.innerHTML = `
            <label for="stock" class="form-label">Stock Quantity</label>
            <input type="number" class="form-control" id="stock" name="stock" value="${product?.stock || ''}">
            <p class="text-danger d-none"></p>
        `;
        container.append(stockField);

        // Price Field
        const priceField = document.createElement('div');
        priceField.classList.add('mb-3');
        priceField.innerHTML = `
            <label for="price" class="form-label">Price</label>
            <input type="number" step="0.01" class="form-control" id="price" name="price" value="${product?.price || ''}">
            <p class="text-danger d-none"></p>
        `;
        container.append(priceField);

        // Submit Button
        const submitBtn = document.createElement('div');
        submitBtn.innerHTML = `
            <button type="submit" class="btn btn-primary">
                ${product ? 'Update' : 'Save'} Product 
                <i class="fa-solid fa-check"></i>
            </button>
        `;
        container.append(submitBtn);

        form.append(container);
        return form;
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const fields = {
            name: form.name.value.trim(),
            description: form.description.value.trim(),
            stock: form.stock.value,
            price: form.price.value
        };

        // Name validation
        if (!fields.name) {
            showError(form.name, 'Product name is required');
            isValid = false;
        }

        // Description validation
        if (!fields.description) {
            showError(form.description, 'Product description is required');
            isValid = false;
        }

        // Stock validation
        if (!fields.stock) {
            showError(form.stock, 'Stock quantity is required');
            isValid = false;
        } else if (isNaN(fields.stock) || parseInt(fields.stock) < 0) {
            showError(form.stock, 'Invalid stock quantity');
            isValid = false;
        }

        // Price validation
        if (!fields.price) {
            showError(form.price, 'Price is required');
            isValid = false;
        } else if (isNaN(fields.price) || parseFloat(fields.price) <= 0) {
            showError(form.price, 'Invalid price value');
            isValid = false;
        }

        return isValid;
    }

    function showError(field, message) {
        const errorElement = field.nextElementSibling;
        errorElement.textContent = message;
        errorElement.classList.remove('d-none');
    }

    // Form submission
    async function handleSubmit(action) {
        if (!validateForm()) return;

        const productData = {
            name: form.name.value.trim(),
            description: form.description.value.trim(),
            stock: parseInt(form.stock.value),
            price: parseFloat(form.price.value)
        };

        try {
            if (action === "new") {
                await productService.saveProduct([productData]);
            } else {
                await productService.updateProduct(productData);
            }
            window.location.href = './list.html';
        } catch (error) {
            showError(form.name, error.includes('exists') ? 
                'Product name already exists' : 'Error saving product');
        }
    }

    // Initialization
    if (!name) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSubmit("new");
        });
    } else {
        try {
            const result = await productService.findProduct(name);
            product = result[0];
            description = product ? product.name : 'Update Product';
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                handleSubmit("update");
            });
        } catch (error) {
            description = error;
        }
    }

    return {
        description,
        element: createContent()
    }
}

export default productBuilder;