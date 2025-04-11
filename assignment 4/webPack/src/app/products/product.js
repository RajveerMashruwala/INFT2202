import productService from "../product.service.js";

function product(app) {
    const {name, listBuilder} = app;
    const container = document.createElement('div');
    container.classList.add('container');
    let h1 = document.createElement('h1');
    h1.innerHTML = 'Add Product';
    container.append(h1);
    container.append(document.createElement('hr'));

    const form = document.createElement('form');

    let product = null;
    function createContent() {
        const mb2 = document.createElement('div');
        mb2.classList.add('mb-2');
        //create product form content
        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        let editableInput = `<input type="text" class="form-control" id="name" name="name">`;
        let readonlyInput = `<input type="text" class="form-control" id="name" name="name" value="${product != null ? product.name : ""}" readonly>`;
        mb3Name.innerHTML = '<label for="name" class="form-label">Product Name</label>' +
            (product != null ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        mb2.append(mb3Name);

        const mb3Description = document.createElement('div');
        mb3Description.classList.add('mb-3');
        mb3Description.innerHTML = '<label for="description" class="form-label">Description</label>' +
            `<input type="text" class="form-control" id="description" name="description" value="${product != null ? product.description : ""}">` +
            '<p class="text-danger d-none"></p>';
        mb2.append(mb3Description);

        const mb3Price = document.createElement('div');
        mb3Price.classList.add('mb-3');
        mb3Price.innerHTML = '<label for="price" class="form-label">Price</label>' +
            '<input type="text" class="form-control" id="price" name="price">' +
            '<p class="text-danger d-none"></p>';
        mb2.append(mb3Price);

        const mb3Quantity = document.createElement('div');
        mb3Quantity.classList.add('mb-3');
        mb3Quantity.innerHTML = '<label for="quantity" class="form-label">Quantity</label>' +
            '<input type="text" class="form-control" id="quantity" name="quantity">' +
            '<p class="text-danger d-none"></p>';
        mb2.append(mb3Quantity);

        const submitBtn = document.createElement('div');
        submitBtn.innerHTML = '<button type="submit" class="btn btn-primary">' +
            'Save Product <i class="fa-solid fa-check"></i>' +
            '</button>';
        mb2.append(submitBtn);
        ///
        form.append(mb2);
        container.append(form)
        return container;
    }
    function validate() {
        let valid = true;
        // validate form
        // test that name is valid
        const name = form.name.value;
        const eleNameError = form.name.nextElementSibling

        if (name == "") {
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "You must name this product!";
            valid = false;
        } else {
            eleNameError.classList.add('d-none');
        }

        // test that description is valid
        const description = form.description.value;
        const eleDescriptionError = form.description.nextElementSibling
        if (description == "") {
            eleDescriptionError.classList.remove('d-none');
            eleDescriptionError.textContent = "Please provide a description.";
            valid = false;
        } else {
            eleDescriptionError.classList.add('d-none');
        }

        const price = form.price.value;
        const elePriceError = form.price.nextElementSibling
        if (price == "") {
            elePriceError.classList.remove('d-none');
            elePriceError.textContent = "Please enter the price.";
            valid = false;
        } else if (isNaN(price)) {
            elePriceError.classList.remove('d-none');
            elePriceError.textContent = "Price must be a number.";
            valid = false;
        } else {
            elePriceError.classList.add('d-none');
        }

        const quantity = form.quantity.value;
        const eleQuantityError = form.quantity.nextElementSibling
        if (quantity == "") {
            eleQuantityError.classList.remove('d-none');
            eleQuantityError.textContent = "Please enter the quantity.";
            valid = false;
        } else if (isNaN(quantity)) {
            eleQuantityError.classList.remove('d-none');
            eleQuantityError.textContent = "Quantity must be a number.";
            valid = false;
        } else {
            eleQuantityError.classList.add('d-none');
        }

        // return if the form is valid or not
        return valid
    }
    // create a handler to deal with the submit event
    function submit(action) {
        // validate the form
        const valid = validate();
        // do stuff if the form is valid
        if (valid) {
            const formData = new FormData(form);
            const productObject = {};
            formData.forEach((value, key) => {
                if (key === 'price' || key === 'quantity') {
                    productObject[key] = Number(value);
                } else {
                    productObject[key] = value;
                }
            });

            const eleNameError = form.name.nextElementSibling
            if (action == "new") {
                productService.saveProduct([productObject])
                    .then(ret => {
                        listBuilder(app);
                    })
                    .catch(err => {
                        eleNameError.classList.remove('d-none');
                        eleNameError.textContent = "Error in adding a product record!";
                    });
            } else {
                productService.updateProduct(productObject)
                    .then(ret => {
                        listBuilder(app);
                    })
                    .catch(err => {
                        eleNameError.classList.remove('d-none');
                        eleNameError.textContent = "Error in updating product record!";
                    });
            }
            eleNameError.classList.add('d-none');
        } else {
            console.log('Form is not valid');
        }
    }

    if (!name) {
        createContent();
        // assign a handler to the submit event
        form.addEventListener('submit', function (event) {
            // prevent the default action from happening
            event.preventDefault();
            submit("new");
        });
    } else {
        h1.innerText = 'Update Product';
        productService.findProduct(name)
            .then(ret => {
                if (ret.length == 0) {
                    throw 'No record';
                }
                product = ret[0];
                createContent();
                form.addEventListener('submit', function (event) {
                    // prevent the default action from happening
                    event.preventDefault();
                    submit("update");
                });
            })
            .catch(err => { h1.innerHTML = err; });
    }
    return {
        element: container
    }
}

export default product;