import productService from "../product.service.js";

export default async function product(name) {
    const form = document.createElement('form');
    let productData = null;
    let isEditMode = false;
    let description = 'Add New Product';

    if (name) {
        isEditMode = true;
        try {
            productData = await productService.findProduct(name);
            if (!productData) throw new Error('Product not found');
            description = `Edit ${productData.name}`;
        } catch (error) {
            return {
                description: error.message,
                element: createErrorDisplay(error.message)
            };
        }
    }

    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');

        container.innerHTML = `
            <div class="mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="name" name="name" 
                    ${isEditMode ? 'readonly' : ''}
                    value="${productData?.name || ''}">
                <div class="invalid-feedback d-none"></div>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" step="0.01" class="form-control" id="price" name="price"
                    value="${productData?.price || ''}">
                <div class="invalid-feedback d-none"></div>
            </div>
            <div class="mb-3">
                <label for="stock" class="form-label">Stock</label>
                <input type="number" class="form-control" id="stock" name="stock"
                    value="${productData?.stock || ''}">
                <div class="invalid-feedback d-none"></div>
            </div>
            <div class="mb-3">
                <label for="desc" class="form-label">Description</label>
                <textarea class="form-control" id="desc" name="desc">${productData?.desc || ''}</textarea>
                <div class="invalid-feedback d-none"></div>
            </div>
            <button type="submit" class="btn btn-primary">
                ${isEditMode ? 'Update' : 'Create'} Product
            </button>
        `;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleSubmit();
        });

        return container;
    }

    async function handleSubmit() {
        const formData = new FormData(form);
        const product = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock')),
            desc: formData.get('desc')
        };

        if (!validateForm(product)) return;

        try {
            if (isEditMode) {
                await productService.updateProduct(product);
            } else {
                await productService.saveProduct(product);
            }
            window.location.href = './list.html';
        } catch (error) {
            showError(error.message);
        }
    }

    function validateForm(product) {
        let isValid = true;
        resetValidation();

        if (!product.name) {
            showValidationError('name', 'Product name is required');
            isValid = false;
        }

        if (isNaN(product.price)) {
            showValidationError('price', 'Valid price is required');
            isValid = false;
        }

        if (isNaN(product.stock)) {
            showValidationError('stock', 'Valid stock quantity is required');
            isValid = false;
        }

        return isValid;
    }

    function showValidationError(field, message) {
        const input = form.querySelector(`#${field}`);
        const feedback = input.nextElementSibling;
        input.classList.add('is-invalid');
        feedback.textContent = message;
        feedback.classList.remove('d-none');
    }

    function resetValidation() {
        form.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
            el.nextElementSibling.classList.add('d-none');
        });
    }

    function showError(message) {
        const errorAlert = document.getElementById('error-alert');
        errorAlert.textContent = message;
        errorAlert.classList.remove('d-none');
    }

    function createErrorDisplay(message) {
        const div = document.createElement('div');
        div.className = 'alert alert-danger';
        div.textContent = message;
        return div;
    }

    form.append(createContent());
    return {
        description: description,
        element: form
    };
}