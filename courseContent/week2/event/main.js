
const images = [
  {file:'pic1.jpg', alt:'Human eye close up'}, 
  {file:'pic2.jpg', alt:'Rock that resembles a wave'},
  {file:'pic3.jpg', alt:'Purple and white flowers'},
  {file:'pic4.jpg', alt:'Hieroglyphics of pharaoh'},
  {file:'pic5.jpg', alt:'Moth on a leaf'}]

function setup(){
  const displayedImage = document.querySelector('.displayed-img');
  const thumbBar = document.querySelector('.thumb-bar').querySelector('ul');
  
  const btnDarken = document.querySelector('.dark');
  const btnAdd = document.querySelector('.add');
  const overlay = document.querySelector('.overlay');

 /*demo static NodeList vs live HTMLCollection*/
  var itemNode = thumbBar.querySelectorAll('.image');
  var itemElement = thumbBar.getElementsByClassName('image') 
  btnDarken.addEventListener('click', (evt) => {
    const btnClass = evt.currentTarget.getAttribute('class');
    if (btnClass === 'dark') {
      evt.currentTarget.setAttribute('class','light');
      evt.currentTarget.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    } else {
      evt.currentTarget.setAttribute('class','dark');
      evt.currentTarget.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
    }
  });
  btnAdd.addEventListener('click', (evt) => {
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
          displayedImage.alt =e.target.alt;
      }); 
    }
  /*Selector Type: querySelectorAll uses CSS selectors, while getElementsByClassName uses class names.
  Return Type: querySelectorAll returns a static NodeList, whereas getElementsByClassName returns a live HTMLCollection.
  Flexibility: querySelectorAll is more flexible as it can use any CSS selector, not just class names
  */  
    console.log(itemNode);
    itemNode = thumbBar.querySelectorAll('.image');
    console.log(itemElement);
  });   
}

function bodyLoad(event){
  console.log('bodyLoad');
  setup();
}

document.addEventListener('DOMContentLoaded', (evt)=>{
  console.log('DOMContentLoaded');
});

//EventTarget <-- Node <-- Document  
//https://developer.mozilla.org/en-US/docs/Web/API/Node
console.log(document.childNodes); //https://dmitripavlutin.com/dom-node-element/
//https://developer.mozilla.org/en-US/docs/Web/API/Document
console.log(document.children);
console.log(document.children[0].childNodes);
console.log(document.children[0].children);