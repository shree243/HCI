import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

import axios from "axios";
import styles from "../styles/styles.module.css";
import Home from './Home';
import User from './User';
import Instructor from './Instructor';
import Layout from './Layout';

const SignIn = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(""); // Store user role after login

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5001/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            localStorage.setItem("userName", res.userName);
            localStorage.setItem("userRole", res.role);
            localStorage.setItem("firstName", res.userData.firstName);
            localStorage.setItem("lastName", res.userData.lastName);
            localStorage.setItem("email", res.userData.email);
            localStorage.setItem("instructor", res.userData.instructor);
            localStorage.setItem("profilePicture", res.userData.profilePicture);
            localStorage.setItem("phoneNumber", res.userData.phoneNumber);
            localStorage.setItem("instructor", res.userData.instructor);
            setUserRole(res.role);
            console.log("loggedIn", loggedIn)
            // Store user role
            console.log("userRole", userRole)
            setLoggedIn(true);
            navigate("/");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <Layout>
            <div className={styles.login_container}>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form className={styles.form_container} onSubmit={handleLogin}>
                            <h1>Login to Your Account</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.green_btn}>
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className={styles.right}>
                        <h1>New Here ?</h1>
                        <Link to="/signUp">
                            <button type="button" className={styles.white_btn}>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
                <div>
                    {/* <Routes>
                    <Route path="/user" element={loggedIn && (userRole === 'user' || userRole === 'instructor') ? <Home /> : <Navigate to="/signIn" />} />
                </Routes> */}
                </div>
            </div>
        </Layout>
    );
};

export default SignIn;
