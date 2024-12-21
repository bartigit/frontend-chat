import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ChatInput = ({ message, setMessage, handleSend, inputRef }) => {
  return (
    <Form className="message-input-form" onSubmit={handleSend}>
      <Form.Control
        className="message-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Napisz wiadomość..."
        ref={inputRef}
      />
      <Button variant="primary" type="submit" className="send-button">
        Wyślij
      </Button>
    </Form>
  );
};

export default ChatInput;