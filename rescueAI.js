// Injecting CSS styles into the page
const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }

    header {
        background-color: #333;
        color: #fff;
        text-align: center;
        padding: 20px 0;
    }

    main {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    #chatbox {
        background-color: #fff;
        border: 1px solid #ddd;
        width: 80%;
        max-width: 600px;
        padding: 20px;
        border-radius: 10px;
    }

    #messages {
        height: 400px;
        overflow-y: scroll;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
    }

    .message {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 8px;
    }

    .user-message {
        background-color: #e1f5fe;
        text-align: right;
    }

    .ai-message {
        background-color: #ffe0b2;
        text-align: left;
    }

    #chat-form {
        display: flex;
    }

    #user-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 10px;
    }

    button {
        padding: 10px 20px;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #555;
    }
`;
document.head.appendChild(style);

// Injecting HTML structure into the body
document.body.innerHTML = `
    <header>
        <h1>Rescue AI</h1>
        <p>Your virtual assistant for emergency response</p>
    </header>

    <main>
        <section id="chatbox">
            <div id="messages"></div>
            <form id="chat-form">
                <input type="text" id="user-input" placeholder="Type your emergency..." required>
                <button type="submit">Send</button>
            </form>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Rescue AI. All rights reserved.</p>
    </footer>
`;

// Simulated AI responses
const aiResponses = {
    "fire": "Please evacuate immediately. Call your local fire department at 911.",
    "flood": "Move to higher ground. Avoid walking or driving through floodwaters.",
    "earthquake": "Drop, cover, and hold on. Stay indoors until the shaking stops.",
    "heart attack": "Call 911 and start performing CPR if trained. Stay calm and wait for help.",
    "accident": "Make sure you're safe first, then call 911 to report the accident.",
    "default": "I'm sorry, I didn't understand that. Can you provide more details about the emergency?"
};

// Handle form submission
document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user input
    const userMessage = document.getElementById('user-input').value.trim();
    if (!userMessage) return;

    // Display user message
    displayMessage(userMessage, 'user-message');

    // Get AI response
    const aiResponse = getAIResponse(userMessage);

    // Display AI response
    setTimeout(() => {
        displayMessage(aiResponse, 'ai-message');
    }, 500);  // Simulate delay

    // Clear input
    document.getElementById('user-input').value = '';
});

// Function to display messages
function displayMessage(message, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = message;

    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

// Function to get AI response based on user input
function getAIResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Check if there's a predefined response for the message
    for (const keyword in aiResponses) {
        if (lowerCaseMessage.includes(keyword)) {
            return aiResponses[keyword];
        }
    }

    // Default response if no keyword matches
    return aiResponses["default"];
}
