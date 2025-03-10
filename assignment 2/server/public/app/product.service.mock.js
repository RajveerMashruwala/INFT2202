class ProductService {
    constructor() {
        if (!localStorage.getItem('products')) {
            // Initialize with 20 sample products
            const initialProducts = Array.from({ length: 20 }, (_, i) => ({
                name: `Product ${i + 1}`,
                price: (i + 1) * 10,
                description: `Description for product ${i + 1}`,
                inStock: true,
                createdAt: new Date().toISOString()
            }));
            localStorage.setItem('products', JSON.stringify(initialProducts));
        }
    }

    getProducts() {
        return JSON.parse(localStorage.getItem('products'));
    }

    // Updated to 20 per page default
    getProductPage({ page = 1, perPage = 20 }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const records = this.getProducts();
                const pagination = {
                    page: Math.max(1, page),
                    perPage,
                    pages: Math.ceil(records.length / perPage) || 1
                };
                
                if (page === 2) reject("No Service");
                
                const start = (pagination.page - 1) * perPage;
                const end = start + perPage;
                
                resolve({
                    records: records.slice(start, end),
                    pagination
                });
            }, 500);
        });
    }

    saveProduct(product) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const products = this.getProducts();
                
                if (products.some(p => p.name === product.name)) {
                    return reject('A product with that name already exists!');
                }
                
                products.unshift(product);
                localStorage.setItem('products', JSON.stringify(products));
                resolve(product);
            }, 250);
        });
    }

    findProduct(productName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (productName === 'name 0') reject('No service');
                
                const products = this.getProducts();
                const product = products.find(p => p.name === productName);
                product ? resolve(product) : reject('Product not found');
            }, 250);
        });
    }

    updateProduct(updatedProduct) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (updatedProduct.name === 'name 0') reject('No service');
                
                const products = this.getProducts();
                const index = products.findIndex(p => p.name === updatedProduct.name);
                
                if (index === -1) return reject('Product not found');
                
                products[index] = updatedProduct;
                localStorage.setItem('products', JSON.stringify(products));
                resolve(updatedProduct);
            }, 250);
        });
    }

    deleteProduct(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name === 'name 0') reject('No service');
                
                const products = this.getProducts();
                const index = products.findIndex(p => p.name === name);
                
                if (index === -1) return reject('Product not found');
                
                products.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(products));
                resolve(true);
            }, 250);
        });
    }
}

export default new ProductService();