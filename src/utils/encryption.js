import CryptoJS from 'crypto-js';

export const encryptMessage = (message, password) => {
    return CryptoJS.AES.encrypt(message, password).toString();
};

export const decryptMessage = (encryptedMessage, password) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedMessage, password);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedText || encryptedMessage;
    } catch {
        return encryptedMessage;
    }
};

 