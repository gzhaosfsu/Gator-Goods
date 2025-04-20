import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mascot from './images/LogoGG.png'; // Update path as needed

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) =>
        setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email.toLowerCase().endsWith('@sfsu.edu')) {
            alert('Please enter a valid SFSU email to register');
        }
        if (form.password !== form.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Register failed');
                return;
            }
            alert('Registered successfully!');
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Something went wrong. Please try again.');
        }
    }
    return (
        <>
            <style>
                {`
        .auth-container {
          display: flex;
          min-height: 100vh;
          font-family: Arial, sans-serif;
          background-color: #1a1a1a;
        }

        .auth-form-section {
          flex: 1;
          background: white;
          padding: 60px 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .auth-form-section h2 {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .underline-yellow {
          width: 60px;
          height: 4px;
          background-color: #FFD700;
          margin-bottom: 40px;
        }

        .auth-form-section form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .auth-form-section input {
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .input-row {
          display: flex;
          gap: 16px;
        }

        .input-row input {
          width: 100%;
        }

        .auth-form-section button {
          padding: 12px;
          background-color: #FFD700;
          color: black;
          font-weight: bold;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .auth-form-section button:hover {
          background-color: #f3c900;
        }

        .auth-form-section hr {
          margin: 30px 0;
        }

        .auth-form-section p {
          font-size: 14px;
        }

        .auth-form-section a {
          color: #1a57d3;
          text-decoration: underline;
          font-weight: 500;
        }

        .auth-illustration-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #1D1160;
        }

        .auth-illustration-section img {
          width: 75%;
          max-width: 700px;
          height: auto;
        }
      `}
            </style>

            <div className="auth-container">
                {/* Left: Form Section */}
                <div className="auth-form-section">
                    <h2>Register</h2>
                    <div className="underline-yellow"></div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-row">
                            <input
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                required
                                onChange={handleChange}
                            />
                            <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            name="email"
                            type="email"
                            placeholder="SF State Email"
                            required
                            onChange={handleChange}
                        />
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            onChange={handleChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={handleChange}
                        />
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            onChange={handleChange}
                        />
                        <button type="submit">Submit</button>
                    </form>

                    <hr />
                    <p>
                        Already have an account?{' '}
                        <a href="/login">Login</a>
                    </p>
                </div>

                {/* Right: Mascot */}
                <div className="auth-illustration-section">
                    <img src={mascot} alt="Gator Goods Mascot" />
                </div>
            </div>
        </>
    );
};

export default Register;
