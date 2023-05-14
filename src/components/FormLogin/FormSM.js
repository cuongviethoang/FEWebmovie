import React, { Fragment } from "react";
import { useState, useRef } from "react";
import "./FormSM.css";
import {
    AiOutlineMail,
    AiOutlineUser,
    AiOutlineCheck,
    AiOutlineExclamationCircle,
} from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function FormSM() {
    const [isCheckLogin, setCheckLogin] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessFul] = useState(false);
    const useNameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    const navigate = useNavigate();

    const handleUpLink = () => {
        setCheckLogin(true);
    };

    const handleInLink = () => {
        setCheckLogin(false);
    };

    const [userName, setUseName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errUseName, setErrUseName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPass, setErrPass] = useState("");

    const handleUsernameChange = (e) => {
        setUseName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleBlur = (e) => {
        const fliedName = e.target.name;
        const value = e.target.value;

        if (value === "") {
            if (fliedName === "username") {
                setErrUseName("Vui lòng nhập tên người dùng");
            } else if (fliedName === "email") {
                setErrEmail("Vui lòng nhập địa chỉ email");
            } else if (fliedName === "password") {
                setErrPass("Vui lòng nhập mật khẩu");
            }
        } else {
            if (fliedName === "email") {
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!regex.test(value)) {
                    setErrEmail("Địa chỉ email không hợp lệ");
                } else {
                    setErrEmail("");
                }
            } else if (fliedName === "password") {
                if (value.length < 6) {
                    setErrPass("Vui lòng nhập từ 6 kí tự trở lên");
                } else {
                    setErrPass("");
                }
            } else {
                setErrUseName("");
                setErrEmail("");
                setErrPass("");
            }
        }
    };

    const handleClick = (e) => {
        const flied = e.target.name;
        if (flied === "username") {
            setErrUseName("");
        }
        if (flied === "email") {
            setErrEmail("");
        }
        if (flied === "password") {
            setErrPass("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userName && !email && !password) {
            alert("Vui lòng đúng  thông tin");
        } else if (userName && email && password) {
            axios
                .post("http://localhost:8081/api/auth/signup", {
                    username: userName,
                    password: password,
                    email: email,
                })
                .then((response) => {
                    return response.data;
                })
                .then((result) => {
                    setSuccessFul(true);
                    console.log(result.message);
                    setMessage(result.message);
                    setTimeout(() => {
                        setMessage("");
                    }, 5000);
                })
                .catch((error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage);
                    setMessage(resMessage);
                    setSuccessFul(false);
                    setTimeout(() => {
                        setMessage("");
                    }, 3000);
                });
        }
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
                        <div
                            className="form-box form_sing-up"
                            onSubmit={handleSubmit}
                        >
                            <form action="" method="POST" id="form-2">
                                <h2 className="form_sing_heading">Sign up</h2>
                                <div className="container_input">
                                    <span className="container_input-icon">
                                        <AiOutlineUser className="icon-size" />
                                    </span>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={userName}
                                        onChange={handleUsernameChange}
                                        onBlur={handleBlur}
                                        placeholder="VD:việt cuờng"
                                        className="form-control"
                                        onClick={handleClick}
                                        ref={useNameRef}
                                    />
                                    <label>UserName</label>
                                    {errUseName && (
                                        <span className="errorMessage">
                                            {errUseName}
                                        </span>
                                    )}
                                </div>
                                <div className="container_input">
                                    <span className="container_input-icon">
                                        <AiOutlineMail className="icon-size" />
                                    </span>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        onBlur={handleBlur}
                                        placeholder="VD: email@domain.com"
                                        className="form-control"
                                        onClick={handleClick}
                                        ref={emailRef}
                                    />
                                    <label>Email</label>
                                    {errEmail && (
                                        <span className="errorMessage">
                                            {errEmail}
                                        </span>
                                    )}
                                </div>

                                <div className="container_input">
                                    <span className="container_input-icon">
                                        <MdPassword className="icon-size" />
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onBlur={handleBlur}
                                        placeholder="Nhập mật khẩu"
                                        className="form-control"
                                        onClick={handleClick}
                                        ref={passRef}
                                    />
                                    <label>Password</label>
                                    {errPass && (
                                        <span className="errorMessage">
                                            {errPass}
                                        </span>
                                    )}
                                </div>

                                <div className="remember-pass">
                                    <label htmlFor="">
                                        <input type="checkbox" /> I agree with
                                        this statment
                                    </label>
                                </div>
                                <button className="btn btn_login-in">
                                    Sign up
                                </button>
                                <div className="form_create-count">
                                    <p className="create-count-title">
                                        Already Have An Account?
                                        <Link
                                            to="/FormLG"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <a
                                                onClick={handleInLink}
                                                href="#"
                                                className="register-link inLink"
                                            >
                                                Sign In
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
                        <div
                            className={
                                successful
                                    ? "alert_icon alert_success"
                                    : "alert_icon alert_danger"
                            }
                        >
                            {successful ? (
                                <AiOutlineCheck className="iconSuccess" />
                            ) : (
                                <AiOutlineExclamationCircle className="iconDanger" />
                            )}
                        </div>
                        <div className="alert_message">{message}</div>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default FormSM;
