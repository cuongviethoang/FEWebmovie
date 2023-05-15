import React from "react";
import "./Header.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCaretDown, AiOutlineLogin } from "react-icons/ai";
import { FaBell, FaBars } from "react-icons/fa";
import axios from "axios";

const Header = () => {
    const [checkDown, setCheckDown] = useState(false);
    const [checkBar, setCheckBar] = useState(false);
    const [storageUser, setStorage] = useState();
    const [checkColor, setCheckColor] = useState(false);
    const [checkColor1, setCheckColor1] = useState(false);
    const [checkColor2, setCheckColor2] = useState(false);
    const [checkAdmin, setCheckAmin] = useState(
        localStorage.getItem("roles").includes("ROLE_ADMIN")
    );
    const navigate = useNavigate();

    useEffect(() => {
        loadDataProfile();
    }, []);

    const loadDataProfile = () => {
        axios
            .get("http://localhost:8081/api/test/user", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if (response.status == 200) {
                    return response.data;
                }
                throw Error(response.status);
            })
            .then((result) => {
                setStorage(result);
            })
            .catch((error) => {
                console.log("error", error);
                logout();
            });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("imgUser");
        localStorage.removeItem("profilePic");
        localStorage.removeItem("roles");
        navigate("/FormLG");
    };

    const handleCheckDown = () => {
        setCheckDown(!checkDown);
    };
    const handleCheckBar = () => {
        setCheckBar(!checkBar);
    };

    const handleCheckColor = () => {
        setCheckColor(true);
        if (checkColor1 == true) setCheckColor1(false);
        if (checkColor2 == true) setCheckColor2(false);
    };

    const handleCheckColor1 = () => {
        setCheckColor1(true);
        if (checkColor == true) setCheckColor(false);
        if (checkColor2 == true) setCheckColor2(false);
    };

    const handleCheckColor2 = () => {
        setCheckColor2(true);
        if (checkColor == true) setCheckColor(false);
        if (checkColor1 == true) setCheckColor1(false);
    };

    return (
        <div className="header">
            <div className="headerPC">
                <div className="logoHeadeing">
                    <Link to="/Home">
                        <h1 id="heading">ReelZool</h1>
                    </Link>
                </div>
                <div className="logoHeaderIcon">
                    <FaBars
                        onChange={handleCheckBar}
                        className="logoHeaderBar"
                    />
                </div>
                <div className="headerContainer">
                    <div className="headerLeft">
                        <div className="header-items">
                            <Link
                                onClick={handleCheckColor}
                                to="/movies/popular"
                                style={{ textDecoration: "none" }}
                                className={
                                    checkColor == true
                                        ? "titleHeader checkColor"
                                        : "titleHeader"
                                }
                            >
                                <span>Popular</span>
                            </Link>
                            <Link
                                onClick={handleCheckColor1}
                                to="/movies/top_rated"
                                style={{ textDecoration: "none" }}
                                className={
                                    checkColor1 == true
                                        ? "titleHeader checkColor"
                                        : "titleHeader"
                                }
                            >
                                <span>Top Rated</span>
                            </Link>
                            <Link
                                onClick={handleCheckColor2}
                                to="/movies/upcoming"
                                style={{ textDecoration: "none" }}
                                className={
                                    checkColor2 == true
                                        ? "titleHeader checkColor"
                                        : "titleHeader"
                                }
                            >
                                <span>Upcoming</span>
                            </Link>
                            {checkAdmin ? (
                                <Link
                                    onClick={handleCheckColor2}
                                    to="/SelectManager"
                                    style={{ textDecoration: "none" }}
                                    className={
                                        checkColor2 == true
                                            ? "titleHeader checkColor"
                                            : "titleHeader"
                                    }
                                >
                                    <span>ManagerMovie</span>
                                </Link>
                            ) : (
                                ""
                            )}
                            {checkAdmin ? (
                                <Link
                                    onClick={handleCheckColor2}
                                    to="/movies/upcoming"
                                    style={{ textDecoration: "none" }}
                                    className={
                                        checkColor2 == true
                                            ? "titleHeader checkColor"
                                            : "titleHeader"
                                    }
                                >
                                    <span>Stat</span>
                                </Link>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="headerRight">
                        <div className="loginSuccess">
                            <Link
                                to="/Profile"
                                style={{
                                    textDecoration: "none",
                                    display: "flex",
                                }}
                            >
                                <img
                                    className="imgUser"
                                    src={
                                        localStorage.getItem("profilePic") != ""
                                            ? "http://localhost:8081/api/file/getImg?path=" +
                                              localStorage.getItem("profilePic")
                                            : "https://tse3.mm.bing.net/th?id=OIP.CiC4AzdlWzYcj2j65RM33AAAAA&pid=Api&P=0"
                                    }
                                />
                            </Link>
                            <div className="listLogout">
                                <AiFillCaretDown
                                    onClick={handleCheckDown}
                                    className="logoDown"
                                />
                                <ul
                                    className={
                                        checkDown
                                            ? "listLogoutItem"
                                            : "listLogoutItem disable"
                                    }
                                >
                                    <li className="logoutItem">
                                        <AiOutlineLogin className="logoLogout" />
                                        <span
                                            className="logoutTitle"
                                            onClick={logout}
                                        >
                                            Đăng xuất
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={checkBar ? "headerMobile" : "disable"}>
                <ul className="headerBarList">
                    <Link
                        to="/movies/popular"
                        style={{ textDecoration: "none", color: "#fff" }}
                    >
                        <li className="headerBarItem">Popular</li>
                    </Link>
                    <Link
                        to="/movies/top_rated"
                        style={{ textDecoration: "none", color: "#fff" }}
                    >
                        <li className="headerBarItem">Top Rated</li>
                    </Link>
                    <Link
                        to="/movies/upcoming"
                        style={{ textDecoration: "none", color: "#fff" }}
                    >
                        <li className="headerBarItem">Upcoming</li>
                    </Link>
                    <Link
                        to="/Login"
                        style={{ textDecoration: "none", color: "#fff" }}
                    >
                        <li className="headerBarItem">Login</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Header;
