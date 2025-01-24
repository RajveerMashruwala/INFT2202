
var func = {
    attr: 12,
    funcAdd: function (a, b) {
        return a + b + this.attr; //'this' is func object
    },
    arrowAdd: (a, b) => {
        return a + b + this.attr;
    }
}
this.attr = 12;
arrowAdd = (a, b) => {
    return a + b + this.attr; //in browser, 'this' is window
}

function funcAdd(a, b) {
    this.attr = a+b;
    return a + b + this.attr; //'this' is func object
}
/*
When new [function] is called, the function body is executed, 
"this" object will be returned with all added in members during the function body call. 
In order to prevent multiplication of member functions, we should define functions in prototype.
*/
var _func = new funcAdd(2,3);
console.log(_func);