import React, { Fragment } from "react";
import { useState } from "react";
import "./FormSM.css";
import { AiOutlineMail, AiOutlineExclamationCircle } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function FormLG() {
    const [isCheckLogin, setCheckLogin] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(
        localStorage.getItem("accessToken") !== null
    );
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const setParams = (event) => {
        const { name, value } = event.target;
        name === "username" ? setUsername(value) : setPassword(value);
    };

    const handleSubmit = () => {
        axios
            .post("http://localhost:8081/api/auth/signin", {
                username: username,
                password: password,
            })
            .then((response) => {
                return response.data;
            })
            .then((result) => {
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("username", result.username);
                localStorage.setItem("email", result.email);
                localStorage.setItem(
                    "profilePic",
                    result.profilePic ? result.profilePic : ""
                );
                localStorage.setItem("roles", result.roles[0]);
                setIsLogin(true);
                navigate("/Profile");
            })
            .catch((error) => {
                setMessage("Your account password is not correct");
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            });
    };

    return (
        <Fragment>
            <div className="body">
                <div className="form_background"></div>
                <div className="form_title_mobile">
                    <h2 className="form_title-heading">
                        Welcome! <br />
                        <span> To Our Web </span>
                    </h2>
                    <p className="form_title-desc">
                        Thank you for coming to our free movie website
                    </p>
                </div>
                <div className="form_container">
                    <div className="form_item">
                        <h2 className="form_logo">
                            <i className="bx bxl-xing"></i>ReelZool
                        </h2>
                        <div className="form_title">
                            <h2 className="form_title-heading">
                                Welcome! <br />
                                <span> To Our Web </span>
                            </h2>
                            <p className="form_title-desc">
                                Thank you for coming to our free movie website
                            </p>
                        </div>
                    </div>
                    <div
                        className={
                            isCheckLogin
                                ? "form_login-section active"
                                : "form_login-section"
                        }
                    >
                        <div className="form-box form_sing-in">
                            <form action="" method="POST" id="form-1">
                                <h2 className="form_sing_heading">Sign in</h2>
                                <div className="container_input">
                                    <span className="container_input-icon">
                                        <AiOutlineMail className="icon-size" />
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={setParams}
                                    />
                                    <label>User</label>
                                </div>
                                <div className="container_input">
                                    <span className="container_input-icon">
                                        <MdPassword className="icon-size" />
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={setParams}
                                    />
                                    <label>Password</label>
                                </div>
                                <div className="remember-pass">
                                    <label htmlFor="">
                                        <input type="checkbox" /> Remember me
                                    </label>
                                    <a href="#" className="forget_link">
                                        Forget Password
                                    </a>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="btn btn_login-in"
                                >
                                    Login in
                                </button>
                                <div className="form_create-count">
                                    <p className="create-count-title">
                                        Create A New Account?
                                        <Link
                                            to="/FormSM"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <a
                                                href="#"
                                                className="register-link upLink"
                                            >
                                                Sign Up
                                            </a>
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {message && (
                    <div className="alert">
                        <div className="alert_icon alert_danger">
                            <AiOutlineExclamationCircle className="iconDanger" />
                        </div>
                        <div className="alert_message">{message}</div>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default FormLG;
