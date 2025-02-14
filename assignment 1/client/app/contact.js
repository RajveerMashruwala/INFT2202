// Initialize message storage
if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
}
const messageStore = JSON.parse(localStorage.getItem('messages'));

// DOM elements
const container = document.getElementById('message-container');
const formElement = document.getElementById('contact-form');

// Initial render
renderMessages();

// Form submission handler
formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const message = new ContactMessage({
        name: formData.get('name').trim(),
        phone: formData.get('phone').trim(),
        email: formData.get('email').trim(),
        message: formData.get('message').trim()
    });

    if (validateMessage(message)) {
        saveMessage(message);
        event.target.reset();
        renderMessages();
    }
});

// Validation function
function validateMessage(message) {
    let isValid = true;
    
    if (!message.name) {
        alert('Please enter your name');
        isValid = false;
    }
    
    if (!message.email.includes('@')) {
        alert('Please enter a valid email address');
        isValid = false;
    }
    
    if (!message.message) {
        alert('Please enter a message');
        isValid = false;
    }
    
    return isValid;
}

// Save message to storage
function saveMessage(message) {
    messageStore.push(message);
    localStorage.setItem('messages', JSON.stringify(messageStore));
}

// Render messages
function renderMessages() {
    container.innerHTML = '';
    
    if (messageStore.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                No messages yet. Be the first to contact us!
            </div>
        `;
        return;
    }

    messageStore.forEach(message => {
        container.appendChild(createMessageCard(message));
    });
}

// Create message card element
function createMessageCard(message) {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${message.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${message.email}</h6>
            ${message.phone ? `<p class="card-text">Phone: ${message.phone}</p>` : ''}
            <p class="card-text">${message.message}</p>
            <small class="text-muted">${new Date().toLocaleString()}</small>
        </div>
    `;
    return card;
}

// Contact message constructor
function ContactMessage({ name, phone, email, message }) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.message = message;
    this.timestamp = new Date().toISOString();
}