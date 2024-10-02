/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email, onVerified }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState('');

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('http://localhost:8000/send-verification-code', { email });
      if (response.data.success) {
        setIsCodeSent(true);
        setError('');
      } else {
        setError('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post('http://localhost:8000/verify-code', { email, code: verificationCode });
      if (response.data.success) {
        onVerified();
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="space-y-4">
      {!isCodeSent ? (
        <div>
          <p>We need to verify your email address: {email}</p>
          <button
            onClick={sendVerificationCode}
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Send Verification Code
          </button>
        </div>
      ) : (
        <div>
          <p>We've sent a verification code to {email}. Please enter it below:</p>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={verifyCode}
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Verify Code
          </button>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default EmailVerification;