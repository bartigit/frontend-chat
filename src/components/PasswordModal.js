import React from 'react';
import { Modal, Form, Button, Image } from 'react-bootstrap';

const PasswordModal = ({ show, userId, password, setUserId, setPassword, handlePasswordSubmit }) => (
    <Modal show={show} backdrop="static" keyboard={false} className="dark-modal">
        <Modal.Header>
            <Modal.Title className="text-center w-100">Wprowadź hasło i ID użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="logo-container">
                <Image src="/chat-bubbles.png" alt="Logo" className="logo" />
            </div>
            <Form autoComplete="on">
                <Form.Group className="mb-3">
                    <Form.Label>ID Użytkownika</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Wprowadź ID użytkownika"
                        autoComplete="username"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Wprowadź hasło"
                        autoComplete="current-password"
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" className='w-100' onClick={handlePasswordSubmit} disabled={!password || !userId}>
                Potwierdź
            </Button>
        </Modal.Footer>
    </Modal>
);

export default PasswordModal;