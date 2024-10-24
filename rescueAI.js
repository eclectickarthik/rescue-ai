import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const aiResponses = {
        "fire": "Please evacuate immediately. Call your local fire department at 911.",
        "flood": "Move to higher ground. Avoid walking or driving through floodwaters.",
        "earthquake": "Drop, cover, and hold on. Stay indoors until the shaking stops.",
        "heart attack": "Call 911 and start performing CPR if trained. Stay calm and wait for help.",
        "accident": "Make sure you're safe first, then call 911 to report the accident.",
        "default": "I'm sorry, I didn't understand that. Can you provide more details about the emergency?"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input) return;

        const userMessage = input.trim();
        setMessages([...messages, { text: userMessage, user: true }]);
        const response = getAIResponse(userMessage);
        
        setTimeout(() => {
            setMessages([...messages, { text: userMessage, user: true }, { text: response, user: false }]);
        }, 500);
        setInput("");
    };

    const getAIResponse = (message) => {
        const lowerCaseMessage = message.toLowerCase();
        for (const keyword in aiResponses) {
            if (lowerCaseMessage.includes(keyword)) {
                return aiResponses[keyword];
            }
        }
        return aiResponses["default"];
    };

    return (
        <div>
            <Head>
                <title>RESCUE AI: REVOLUTIONIZING EMERGENCY RESPONSE</title>
                <style>{`
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #e0f7fa; /* Light blue background */
                        margin: 0;
                        padding: 0;
                    }
                    header {
                        background-color: #0288d1; /* Darker blue for header */
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
                        background-color: #b3e5fc; /* Light blue for user messages */
                        text-align: right;
                    }
                    .ai-message {
                        background-color: #ffe0b2; /* Existing color for AI messages */
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
                        background-color: #0288d1; /* Darker blue for button */
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #0277bd; /* Darker blue on hover */
                    }
                    footer {
                        position: fixed;
                        bottom: 10px;
                        right: 10px;
                        font-size: 12px;
                        color: #555;
                    }
                `}</style>
            </Head>

            <header>
                <h1>RESCUE AI: REVOLUTIONIZING EMERGENCY RESPONSE</h1>
                <p>DTM project: made by KARTHIK GANESAN [RA2311042020025], ASWANTH KISHOR [RA2311042020026], ASWIN S [RA2311042020039], SARVESH SAI KUMAR [RA2311042020048]</p>
            </header>

            <main>
                <section id="chatbox">
                    <div id="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.user ? 'user-message' : 'ai-message'}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <form id="chat-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="user-input"
                            placeholder="Type your emergency..."
                            required
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit">Send</button>
                    </form>
                </section>
            </main>

            <footer>
                &copy; 2024 Rescue AI. All rights reserved.
            </footer>
        </div>
    );
}
