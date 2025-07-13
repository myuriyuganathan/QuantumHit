import React, { useState } from 'react';
import mfpImage from '../../assets/mfp.svg';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim();

    if (isSignUp && password !== confirmpassword) {
      setError("Passwords do not match.");
      return;
    }

    const url = isSignUp
      ? 'http://localhost:5000/api/auth/signup'
      : 'http://localhost:5000/api/auth/login';
    const body = isSignUp
      ? { username: trimmedUsername, password, confirmPassword: confirmpassword }
      : { username: trimmedUsername, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignUp) {
          setIsSuccess(true);
        } else {
          
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          navigate('/dashboard');
        }
      } else {
        setError(data.error || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const goToLogin = () => {
    setIsSignUp(false);
    setIsSuccess(false);
  };

  return (
    <div className="bg-violet-300 h-screen flex items-center justify-start font-serif pl-16 ">
      <div className="bg-violet-50 text-black p-8 rounded-lg shadow-lg w-[400px]">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsSignUp(true)}
            className={`w-1/2 py-2 font-semibold rounded-l ${
              isSignUp ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            className={`w-1/2 py-2 font-semibold rounded-r ${
              !isSignUp ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Login
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <>
              <h2 className="text-xl font-bold mb-4">Create an Account</h2>
              <div className="mb-4">
                <label className="block">Username</label>
                <input
                  type="text"
                  value={username}
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block">Confirm Password</label>
                <input
                  type="password"
                  value={confirmpassword}
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 rounded mb-4">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Login to your Account</h2>
              <div className="mb-4">
                <label className="block">Username</label>
                <input
                  type="text"
                  value={username}
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 rounded mb-4">
                Login
              </button>
            </>
          )}
        </form>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {isSuccess && (
          <div className="text-green-600 text-center">
            <p>Your account has been created successfully! Go to Login page </p>
            <button onClick={goToLogin} className="text-blue-600 underline">
              Click here to Login
            </button>
          </div>
        )}

        <div className="text-center text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>

      <div className="hidden md:flex max-w-xl bg-violet-300 items-center justify-center pl-16 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-gray-600">quantumhit</h1>
        <img src={mfpImage} alt="Login Illustration" className="max-w-md" />
      </div>
    </div>
  );
}
