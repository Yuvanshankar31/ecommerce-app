import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        navigate('/add'); // Navigate after setting token
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                Admin Panel
              </h1>
              <p className="text-neutral-600">
                Sign in to manage your ecommerce store
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="space-y-6">
              <div>
                <label className="form-label">
                  Email Address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="input-field"
                  type="email"
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="input-field"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full btn-primary"
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-500">
                Secure admin access for store management
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
