export default new ProductService({
    host: 'https://inft2202-server.onrender.com/',
    user: '100911307'
});

function ProductService({ host, user }) {
    this.host = host;
    this.headers = new Headers({
        'Content-Type': 'application/json',
        user
    });
}

ProductService.prototype.getProductPage = async function({ page = 1, perPage = 8 }) {
    const params = new URLSearchParams({ page, perPage });
    const url = new URL(`/api/products?${params.toString()}`, this.host);
    try {
        const res = await fetch(url, { headers: this.headers });
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    } catch (err) {
        throw new Error('Failed to load products: ' + err.message);
    }
};

ProductService.prototype.saveProduct = async function(product) {
    const url = new URL(`/api/products`, this.host);
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(product)
        });
        const data = await res.json();
        return res.ok ? data : Promise.reject(data);
    } catch (err) {
        throw new Error(err.message || 'Failed to save product');
    }
};

ProductService.prototype.findProduct = async function(name) {
    const url = new URL(`/api/products/${name}`, this.host);
    try {
        const res = await fetch(url, { headers: this.headers });
        if (!res.ok) return null;
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error('Failed to fetch product: ' + err.message);
    }
};

ProductService.prototype.updateProduct = async function(product) {
    const url = new URL(`/api/products`, this.host);
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(product)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Update failed');
        return data;
    } catch (err) {
        throw new Error('Failed to update product: ' + err.message);
    }
};

ProductService.prototype.deleteProduct = async function(name) {
    const url = new URL(`/api/products/${name}`, this.host);
    try {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: this.headers
        });
        if (res.status === 204) return true;
        const data = await res.json();
        throw new Error(data.message || 'Delete failed');
    } catch (err) {
        throw new Error('Failed to delete product: ' + err.message);
    }
};