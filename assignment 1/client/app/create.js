// create.js - Product Version (Fixed)
console.log('we are on the add product page');

// Form elements (Updated IDs)
const productForm = document.getElementById('product-form');
const errorElements = {
    name: document.querySelector('#name + .text-danger'),
    description: document.querySelector('#description + .text-danger'),
    stock: document.querySelector('#stock + .text-danger'),
    price: document.querySelector('#price + .text-danger')
};

// Event listeners
productForm.addEventListener('submit', submitProductForm);

// Main form handler (Fixed field names)
async function submitProductForm(event) {
    event.preventDefault();
    resetErrors();
    
    const formData = new FormData(productForm);
    const product = {
        name: formData.get('name').trim(),
        description: formData.get('description').trim(),
        stock: formData.get('stock'),
        price: formData.get('price')
    };

    if (validateProductForm(product)) {
        try {
            await productService.saveProduct([{
                ...product,
                stock: parseInt(product.stock),
                price: parseFloat(product.price)
            }]);
            
            productForm.reset();
            window.location.href = './list.html';
        } catch (error) {
            handleServiceError(error);
        }
    }
}

// Validation functions (Updated IDs)
function validateProductForm(product) {
    let isValid = true;

    // Name validation
    if (!product.name) {
        errorElements.name.textContent = 'Product name is required';
        errorElements.name.classList.remove('d-none');
        isValid = false;
    }

    // Description validation
    if (!product.description) {
        errorElements.description.textContent = 'Product description is required';
        errorElements.description.classList.remove('d-none');
        isValid = false;
    }

    // Stock validation
    if (!product.stock) {
        errorElements.stock.textContent = 'Stock quantity is required';
        errorElements.stock.classList.remove('d-none');
        isValid = false;
    } else if (isNaN(product.stock) || parseInt(product.stock) < 0) {
        errorElements.stock.textContent = 'Invalid stock quantity';
        errorElements.stock.classList.remove('d-none');
        isValid = false;
    }

    // Price validation
    if (!product.price) {
        errorElements.price.textContent = 'Price is required';
        errorElements.price.classList.remove('d-none');
        isValid = false;
    } else if (isNaN(product.price) || parseFloat(product.price) <= 0) {
        errorElements.price.textContent = 'Invalid price value';
        errorElements.price.classList.remove('d-none');
        isValid = false;
    }

    return isValid;
}

// Error handling (No changes needed)
function resetErrors() {
    Object.values(errorElements).forEach(element => {
        element.textContent = '';
        element.classList.add('d-none');
    });
}

function handleServiceError(error) {
    console.error('Product save error:', error);
    
    if (error.includes('already exists')) {
        errorElements.name.textContent = 'Product name already exists';
        errorElements.name.classList.remove('d-none');
    } else {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger mt-3';
        errorMessage.textContent = `Error saving product: ${error}`;
        productForm.parentNode.insertBefore(errorMessage, productForm.nextSibling);
    }
}