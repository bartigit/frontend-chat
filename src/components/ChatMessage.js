import React, { useRef, useEffect } from 'react';

const ChatMessage = ({ messages, userId }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messages-container flex-grow-1">
      {messages.map((msg, index) => {
        const isOwnMessage = msg.userId === userId;
        return (
          <div
            key={index}
            className={`message-bubble ${isOwnMessage ? 'outgoing' : 'incoming'}`}
          >
            <div className="message-user">{msg.userId}</div>
            <div className="message-text">{msg.decrypted}</div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessage;