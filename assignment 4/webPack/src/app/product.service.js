export default new ProductService({
    host: 'https://inft2202-server.onrender.com',
    user: '0000'
});

function ProductService({ host, user }) {
    this.host = host;
    this.headers = new Headers({
        'Content-Type': 'application/json',
        user
    });
}

ProductService.prototype.findProduct = async function(sku) {
    const url = new URL(`/products/${encodeURIComponent(sku)}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

ProductService.prototype.getProductPage = async function({ page = 1, perPage = 8 }) {
    const params = new URLSearchParams({ page, perPage });
    const url = new URL(`/products?${params.toString()}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

ProductService.prototype.saveProduct = async function(product) {
    const url = new URL(`/products`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(product)
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

ProductService.prototype.updateProduct = async function(product) {
    const url = new URL(`/products`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'PUT',
        body: JSON.stringify(product)
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

ProductService.prototype.deleteProduct = async function(sku) {
    const url = new URL(`/products/${sku}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'DELETE',
    });
    try {
        const res = await fetch(req);
        return res.status === 204;
    } catch (err) {
        return false;
    }
}