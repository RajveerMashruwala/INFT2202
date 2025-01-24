rectangle = function (x, y, width, height) {

    if (isNaN(height) || isNaN(width) || isNaN(x) || isNaN(y) || typeof height !== "number" || typeof width !== "number" || typeof x !== "number" || typeof y !== "number") {
        return false;
    }
    else {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
    }
};
//we should put all member functions in prototype
rectangle.prototype = {
	getHeight: function () {
        return this.height;
    },
	getWidth: function () {
        return this.width;
    },
    getX: function () {
        return this.x;
    },
	getRight: function () {
		return this.x + this.width;
	},
	getBottom: function () {
		return this.y + this.height;
	},
	getY: function () {
        return this.y;
    },
	getSize: function () {
        return {
            height: this.height,
            width: this.width
        };
    },
	getLocation: function () {
        return {
            x: this.x,
            y: this.y
        };
    },
    setHeight: function (height) {
        if (!isNaN(height) && typeof height === "number" && height !== Infinity) {
            this.height = height;
            return true;
        }
        else {
            return false;
        }
    },
    setWidth: function (width) {
        if (!isNaN(width) && typeof width === "number" && width !== Infinity) {
            this.width = width;
            return true;
        }
        else {
            return false;
        }
    },
    setX: function (x) {
        if (!isNaN(x) && typeof x === "number" && x !== Infinity) {
            this.x = x;
            return true;
        }
        else {
            return false;
        }
    },
    setY: function (y) {
        if (!isNaN(y) && typeof y === "number" && y !== Infinity) {
            this.y = y;
            return true;
        }
        else {
            return false;
        }
    },
    setSize: function (width, height) {
        if (!isNaN(width) && typeof width === "number" && width !== Infinity && !isNaN(height) && typeof height === "number" && height !== Infinity) {
            this.width = width;
            this.height = height;
            return true;
        }
        else {
            return false;
        }
    },
    setLocation: function (x, y) {
        if (!isNaN(x) && typeof x === "number" && x !== Infinity && !isNaN(y) && typeof y === "number" && y !== Infinity) {
            this.y = y;
            this.x = x;
            return true;
        }
        else {
            return false;
        }
    },
    getCenter: function () {
        return {
            x: this.x + (this.width / 2),
            y: this.y + (this.height / 2)
        };
    },
    contains: function (x, y) {
        if (x <= this.x || y <= this.y || y >= this.y + this.height || x >= this.x + this.width) {
            return false;
        }
        else {
            return true;
        }
    },
    containpoint: function (pt) {
        if (pt.x <= this.x || pt.y <= this.y || pt.y >= this.y + this.height || pt.x >= this.x + this.width) {
            return false;
        }
        else {
            return true;
        }
    },
	dispose: function () {
		//alert("bye " + this.getName());
	},
    toString: function () {
        return "{height: " + this.height + ", width: " + this.width + ", x: " + this.x + ", y: " + this.y + "}";
    }
};
