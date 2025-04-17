import React, { useState } from 'react';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Logged in!');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="email"
                            placeholder="SF State Email"
                            required
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <hr />
            <p>
                Forgot Password? <a href="#">Click here</a><br />
                Don’t have an account? <a href="/register">Sign up</a>
            </p>
        </div>
    );
};

export default Login;
