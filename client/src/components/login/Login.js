// login
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../components/registration/Register.css'
import './Login.css'

const Login = ({
    login_info,
    submitLogin,
    getLogin_username,
    getLogin_password,
    login,
}) => {
    const navigation = useNavigate();
    useEffect(() => {
        if (login_info.auth === "ok") {
            navigation(`/PeopleCards?login_info=${login_info.auth}`)
        }
    }, [login_info])

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
                <form className="form" id="login" method="post" onSubmit={login}>
                    <h2>Login</h2>
                    Username:
                    <br />{" "}
                    <input
                        className="form-control"
                        type="username"
                        name="username"
                        placeholder="username"
                        id="usernameL"
                        onChange={getLogin_username}
                    />
                    <br />
                    Password:
                    <br />{" "}
                    <input
                        className="form-control"
                        type="text"
                        name="password"
                        placeholder="password"
                        id="passwordL"
                        onChange={getLogin_password}
                    />
                    <br />
                    <input
                        className="login-btn"
                        type="submit"
                        id="submitLogin"
                        value="Login"
                        disabled={submitLogin}
                    />

                </form>
            </div>
        </div>
    );
};
export default Login;