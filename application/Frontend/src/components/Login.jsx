import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mascot from './images/LogoGG.png';
import {dummyUser} from "../dummyUser";

const Login = ({setUser}) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });

            const data = await response.json();

            /*if (!response.ok) {
                alert(data.message || 'Login failed');
                return;
            }*/

            alert('Logged in!');
            setUser(data.user);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            alert('Something went wrong. Please try again.');
        }
    };


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

        .underline {
          width: 60px;
          height: 4px;
          background-color: #2D1060;
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

        .auth-form-section button {
          padding: 12px;
          background-color: #2D1060;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .auth-form-section button:hover {
          background-color: #3c1685;
        }

        .auth-form-section hr {
          margin: 30px 0;
        }

        .link-text {
          font-size: 14px;
        }

        .link-text a {
          color: #1a57d3;
          text-decoration: underline;
        }

        .auth-illustration-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .yellow-bg {
          background-color: #FFE36E;
        }

        .auth-illustration-section img {
          width: 75%;
          max-width: 700px;
          height: auto;
        }
      `}
            </style>

            <div className="auth-container">
                {/* Left Side: Login Form */}
                <div className="auth-form-section">
                    <h2>Login</h2>
                    <div className="underline"></div>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            type="email"
                            placeholder="SF State Email"
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
                        <button type="submit">Login</button>
                    </form>
                    <hr />
                    <p className="link-text">
                        Forgot Password? <a href="#">Click here</a><br />
                        Don’t have an account? <a href="/register">Sign up</a>
                    </p>
                </div>

                {/* Right Side: Mascot Illustration */}
                <div className="auth-illustration-section yellow-bg">
                    <img src={mascot} alt="Gator Goods Mascot" />
                </div>
            </div>
        </>
    );
};

export default Login;
