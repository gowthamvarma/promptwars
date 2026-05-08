const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';
    
    // Show typing indicator
    typingIndicator.classList.remove('hidden');
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (data.redirect) {
            window.location.href = data.redirect;
            return;
        }

        if (data.response) {
            appendMessage('model', data.response);
        } else if (data.error) {
            appendMessage('model', 'Oops! ' + data.error);
        }
    } catch (error) {
        appendMessage('model', 'Sorry, I lost my connection to the tropics. Please try again! 🦜');
    } finally {
        typingIndicator.classList.add('hidden');
    }
});

// Scroll to bottom on load
chatWindow.scrollTop = chatWindow.scrollHeight;
