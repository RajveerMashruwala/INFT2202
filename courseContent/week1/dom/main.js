const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar').querySelector('ul');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = [
  { file: 'pic1.jpg', alt: 'Human eye close up' },
  { file: 'pic2.jpg', alt: 'Rock that resembles a wave' },
  { file: 'pic3.jpg', alt: 'Purple and white flowers' },
  { file: 'pic4.jpg', alt: 'Hieroglyphics of pharaoh' },
  { file: 'pic5.jpg', alt: 'Moth on a leaf' }]

/*demo static NodeList vs live HTMLCollection*/
var itemNode = thumbBar.querySelectorAll('.image');
var itemElement = thumbBar.getElementsByClassName('image');
for (const image of images) {
  const newItem = document.createElement('li');
  newItem.setAttribute('class','image');
  const newImage = document.createElement('input');
  newImage.setAttribute('type', 'image');
  newImage.setAttribute('src', `images/${image.file}`);
  newImage.setAttribute('alt', `images/${image.alt}`);
  newItem.appendChild(newImage);
  thumbBar.appendChild(newItem);
  newImage.addEventListener('click', e => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });
}
/*Selector Type: querySelectorAll uses CSS selectors, while getElementsByClassName uses class names.
Return Type: querySelectorAll returns a static NodeList, whereas getElementsByClassName returns a live HTMLCollection.
Flexibility: querySelectorAll is more flexible as it can use any CSS selector, not just class names
*/
console.log(itemNode);
itemNode = thumbBar.querySelectorAll('.image');
console.log(itemElement);

//EventTarget <-- Node <-- Document  
//https://developer.mozilla.org/en-US/docs/Web/API/Node
//https://dmitripavlutin.com/dom-node-element/
//https://developer.mozilla.org/en-US/docs/Web/API/Document

//https://developer.mozilla.org/en-US/docs/Web/API/Document/children
console.log(document.children); //static HtmlCollection
//https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
console.log(document.children[0].childNodes); //live NodeList
console.log(document.children[0].children);

console.log(document.childNodes);
console.log(document.childNodes[2].childNodes); //only item 2 is a HTML element
console.log(document.childNodes[2].children);