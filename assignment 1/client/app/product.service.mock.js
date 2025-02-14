/*
 *  Product Service constructor
 */
function ProductService() {
    // Initialize products in localStorage if not exists
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([]));
    }
}

/*
 *  Get all products
 */
ProductService.prototype.getProducts = function() {
    return JSON.parse(localStorage.getItem('products'));
}

/*
 *  Get paginated products
 */
ProductService.prototype.getProductPage = function({ page = 1, perPage = 15 }) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            const records = JSON.parse(localStorage.getItem('products'));
            const pagination = {
                page: page,
                perPage: perPage,
                pages: Math.ceil(records.length / perPage)
            }
            
            // For testing error cases
            if (pagination.page == 2) {
                reject("Service Unavailable");
            }
            
            const start = (pagination.page - 1) * perPage;
            const end = start + perPage;
            
            resolve({
                records: records.slice(start, end),
                pagination
            });
        }, 500);
    });
}

/*
 *  Save product(s)
 */
ProductService.prototype.saveProduct = function(products) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(function() {
            const currentProducts = self.getProducts();
            
            // Check for existing products first
            for(const product of products) {
                if(currentProducts.some(p => p.name === product.name)) {
                    return reject('A product with that name already exists!');
                }
            }

            // Add new products to the BEGINNING of the array
            const updatedProducts = [...products, ...currentProducts];
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            resolve(true);
        }, 250);
    });
};

/*
 *  Find a product by name
 */
ProductService.prototype.findProduct = function(productName) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(() => {
            if (productName === 'name 0') {
                reject('Service Unavailable');
            } else {
                const products = self.getProducts();
                const product = products.find(p => p.name === productName);
                if (!product) {
                    resolve([]);
                }
                resolve([product]);
            }
        }, 250);
    });
}

/*
 *  Update a product
 */
ProductService.prototype.updateProduct = function(product) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(() => {
            if (product.name === 'name 0') {
                reject('Service Unavailable');
            } else {
                const products = self.getProducts();
                const idx = products.findIndex(p => p.name === product.name);
                if (idx === -1) {
                    resolve(false);
                }
                products[idx] = product;
                localStorage.setItem('products', JSON.stringify(products));
                resolve(true);
            }
        }, 250);
    });
}

/*
 *  Delete a product
 */
ProductService.prototype.deleteProduct = function(name) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(function() {
            if (name === 'name 0') {
                reject('Service Unavailable');
            } else {
                const products = self.getProducts();
                const idx = products.findIndex(p => p.name === name);
                if (idx === -1) {
                    resolve(false);
                }
                products.splice(idx, 1);
                localStorage.setItem('products', JSON.stringify(products));
                resolve(true);
            }
        }, 250);
    });
}

export default new ProductService();