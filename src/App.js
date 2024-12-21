import React, { useState } from 'react';
import PasswordModal from './components/PasswordModal';
import Chat from './components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(true);
    const [fetchMessages, setFetchMessages] = useState(false);

    const handlePasswordSubmit = () => {
        setShowPasswordModal(false);
        setFetchMessages(true);
    };

    return (
        <>
            <PasswordModal
                show={showPasswordModal}
                userId={userId}
                password={password}
                setUserId={setUserId}
                setPassword={setPassword}
                handlePasswordSubmit={handlePasswordSubmit}
            />
            {!showPasswordModal && 
            <Chat 
            userId={userId} 
            password={password} 
            fetchMessages={fetchMessages} 
            />
            }
        </>
    );
}

export default App;
