// Register
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.css'

const Signup = (props) => {
    const navigate = useNavigate()

    const {
        submitRegi,
        getSign_username,
        getSign_password,
        getFirsName,
        getLastName,
        getUserPhone,
        getEmail,

    } = props

    const register = async (event) => {
        event.preventDefault();
        const { sign_username, sign_password, firstName, lastName, email, phone } = props.userData;
        let username = sign_username;
        let password = sign_password;

        await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ username, password, firstName, lastName, email, phone }),
        })
            .then((res) => {
                navigate('/login')
            })
            .catch((err) => console.log(err));

    };
    return (
        <div className="form-container">

            <section className="mini-nuv">
                <Link to="/" style={{ margin: "10px" }}>
                    Sign Up
                </Link>

                <Link to="/login" style={{ margin: "10px" }}>
                    Login
                </Link>
            </section>

            <div className="container">
                <form className="form" id="register" method="POST" onSubmit={register}>
                    <h2>Register</h2>
                    First Name:
                    <br />
                    <input
                        className="form-control"
                        type="text"
                        name="firsName"
                        placeholder="write your first name"
                        id="firsName"
                        onChange={getFirsName}
                    />
                    <br />
                    Last Name:
                    <br />
                    <input
                        className="form-control"
                        type="text"
                        name="lName"
                        placeholder="write your last name"
                        id="lName"
                        onChange={getLastName}
                    />
                    <br />
                    Email:
                    <br />
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="your email"
                        id="email"
                        onChange={getEmail}
                    />
                    <br />
                    Username:
                    <br />
                    <input
                        className="form-control"
                        type="username"
                        name="username"
                        placeholder="create a username"
                        id="username"
                        onChange={getSign_username}
                    />
                    <br />
                    Phone Number:
                    <br />
                    <input
                        className="form-control"
                        type="text"
                        name="phone"
                        placeholder="your phone number"
                        id="phone"
                        onChange={getUserPhone}
                    />
                    <br />
                    Password:
                    <br />
                    <input
                        className="form-control"
                        type="text"
                        name="password"
                        placeholder="create a new password"
                        id="password"
                        onChange={getSign_password}
                    />
                    <br />
                    <input
                        className="regi-btn"
                        type="submit"
                        id="submitRegi"
                        value="Register"
                        disabled={submitRegi}
                    />
                </form>
            </div>
        </div>
    );
};
export default Signup;
