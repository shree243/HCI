import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styless.module.css";
import Layout from "./Layout";


const SignUp = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Fetch the list of instructors
            const url = "http://localhost:5001/api/users/findByRole";
            const response = await axios.post(url, { userRole: 'instructor' });
            const instructorNames = response.data.map((user) => user.firstName);

            // Randomly select an instructor if instructors are available
            let randomInstructor = '';
            if (instructorNames.length > 0) {
                const randomIndex = Math.floor(Math.random() * instructorNames.length);
                randomInstructor = instructorNames[randomIndex];
            }

            // Create data for registration
            const newData = {
                ...data,
                instructor: randomInstructor,
            };

            const formData = new FormData();
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('role', data.role);
            formData.append('phoneNumber', data.phoneNumber);
            formData.append('profilePicture', data.profilePicture);
            formData.append('instructor', randomInstructor);


            // Post the registration data
            const registerUrl = "http://localhost:5001/api/users/register";
            const { data: res } = await axios.post(registerUrl, formData);

            navigate("/SignIn");
            console.log(res.message);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const url = "http://localhost:5001/api/users/findByRole";
                const response = await axios.post(url, { role: 'instructor' });
                const instructorNames = response.data.map((user) => user.firstName);
                setInstructors(instructorNames);
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };

        fetchInstructors();
    }, []);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
        profilePicture: "",
        phoneNumber: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
        // fetchInstructors();
    };
    const handleImageChange = ({ currentTarget: input }) => {
        setData({ ...data, profilePicture: input.files[0] });
    };

    return (
        <Layout>
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                    <div className={styles.left}>
                        <h1>Welcome Back</h1>
                        <Link to="/SignIn">
                            <button type="button" className={styles.white_btn}>
                                Sing in
                            </button>
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>Create Account</h1>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleChange}
                                value={data.firstName}
                                required
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                value={data.lastName}
                                required
                                className={styles.input}
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                onChange={handleChange}
                                value={data.phoneNumber}
                                required
                                className={styles.input}
                            />
                            <input type="file" name="image" onChange={handleImageChange} />
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
                            <select
                                name="role"
                                value={data.role}
                                onChange={handleChange}
                                className={styles.input}
                            >
                                <option value="user">User</option>
                                <option value="instructor">Instructor</option>
                            </select>
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.green_btn}>
                                Sing Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SignUp;