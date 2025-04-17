import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        alert('Registered successfully!');
        navigate('/');
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        First Name:
                        <input
                            name="firstName"
                            type="text"
                            required
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input
                            name="lastName"
                            type="text"
                            required
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        SF State Email:
                        <input
                            name="email"
                            type="email"
                            required
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Username:
                        <input
                            name="username"
                            type="text"
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
                            required
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Confirm Password:
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <hr />
            <p>
                Already have an account? <a href="/">Login</a>
            </p>
        </div>
    );
};

export default Register;