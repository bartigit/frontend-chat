import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import socket from '../utils/socket';
import { encryptMessage, decryptMessage } from '../utils/encryption';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const Chat = ({ userId, password, fetchMessages }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (fetchMessages && password) {
      fetch(`${process.env.REACT_APP_SOCKET_HOST}:${process.env.REACT_APP_SOCKET_PORT}/messages`)
        .then((response) => response.json())
        .then((data) => {
          const decryptedMessages = data.map((msg) => {
            const decrypted = decryptMessage(msg.message, password);
            return {
              userId: msg.user_id,
              original: msg.message,
              decrypted
            };
          });
          setMessages(decryptedMessages);
        })
        .catch((err) => console.error('Błąd podczas pobierania wiadomości:', err));
    }
  }, [fetchMessages, password]);

  useEffect(() => {
    const handleMessage = (data) => {
      if (!data || !data.userId || !data.message) {
        console.error('Odebrano wiadomość z nieprawidłowymi danymi:', data);
        return;
      }
      if (data.message === '/clearchat') {
        setMessages([]);
      } else {
        const decryptedMessage = decryptMessage(data.message, password);
        if (!messages.some((msg) => msg.original === data.message)) {
          setMessages((prev) => [
            ...prev,
            {
              userId: data.userId,
              original: data.message,
              decrypted: decryptedMessage
            }
          ]);
        }
      }
    };

    socket.on('message', handleMessage);
    return () => {
      socket.off('message', handleMessage);
    };
  }, [password, messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message && password) {
      if (message === '/clearchat') {
        fetch(`${process.env.REACT_APP_SOCKET_HOST}:${process.env.REACT_APP_SOCKET_PORT}/clear`, {
          method: 'GET'
        });
        socket.emit('message', { userId, message });
        setMessages([]);
        setMessage('');
        inputRef.current?.focus();
        return;
      }

      const encryptedMessage = encryptMessage(message, password);
      socket.emit('message', { userId, message: encryptedMessage });
      setMessage('');
      inputRef.current?.focus();
    }
  };

  return (
    <Container fluid className="app-container">
      <Row className="h-100">
        <Col md={12} className="d-flex flex-column chat-container">
          <ChatMessage messages={messages} userId={userId} />

          <ChatInput
            message={message}
            setMessage={setMessage}
            handleSend={handleSend}
            inputRef={inputRef}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;