// src/components/ChatWidget.jsx
import React, { useState } from "react";
import axios from "axios";

const ChatWidget = () => {
    const [messages, setMessages] = useState([
        { from: "assistant", text: "Hello! I am SmartGov Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { from: "user", text: input }]);
        const question = input;
        setInput("");

        try {
            const res = await axios.post("http://localhost:8080/api/chat", { question });
            const data = res.data;

            // Add assistant message
            setMessages((prev) => [
                ...prev,
                {
                    from: "assistant",
                    text: data.answer,
                    suggestions: data.suggestions || []
                }
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { from: "assistant", text: "Oops! Something went wrong. Please try again later." }
            ]);
        }
    };

    return (
        <div style={{ width: "400px", border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
            <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "10px" }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ marginBottom: "8px", textAlign: msg.from === "user" ? "right" : "left" }}>
                        <div
                            style={{
                                display: "inline-block",
                                padding: "8px 12px",
                                borderRadius: "20px",
                                background: msg.from === "user" ? "#4f46e5" : "#f3f4f6",
                                color: msg.from === "user" ? "#fff" : "#111",
                                maxWidth: "80%"
                            }}
                        >
                            {msg.text}
                            {msg.suggestions && msg.suggestions.length > 0 && (
                                <div style={{ marginTop: "6px" }}>
                                    {msg.suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setInput(s)}
                                            style={{
                                                margin: "2px",
                                                padding: "4px 8px",
                                                borderRadius: "12px",
                                                border: "1px solid #4f46e5",
                                                background: "#fff",
                                                color: "#4f46e5",
                                                cursor: "pointer",
                                                fontSize: "12px"
                                            }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex" }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    style={{ flex: 1, padding: "8px", borderRadius: "20px", border: "1px solid #ccc" }}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        marginLeft: "6px",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        border: "none",
                        background: "#4f46e5",
                        color: "#fff",
                        cursor: "pointer"
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWidget;