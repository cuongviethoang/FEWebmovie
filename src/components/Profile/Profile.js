import React, { Fragment, useRef } from "react";
import Header from "../Header/Header";
import "../Profile/Profile.css";
import "../grid/grid.css";
import { AiFillCamera } from "react-icons/ai";
import { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

function Profile() {
    const [checkCamera, setCheckCamera] = useState(false);
    const [files, setFiles] = useState(null);
    const [imageSrc, setImageSrc] = useState("");

    const handleUpFile = () => {
        setCheckCamera(true);
    };

    const handleCloseUpFile = () => {
        setCheckCamera(false);
    };

    function handleUpLoad(e) {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("files", file);
        setFiles(formData);
        console.log(file.name);

        const reader = new FileReader();

        reader.onload = (event) => {
            setImageSrc(event.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const handleConfirm = () => {
        axios
            .post("http://localhost:8081/api/file/upload", files, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                return res.data;
            })
            .catch((error) => console.log("error" + error));

        axios
            .post(
                "http://localhost:8081/api/test/userImg?img=" +
                    files.get("files").name,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                localStorage.setItem("profilePic", files.get("files").name);
                setCheckCamera(false);
                return res.data;
            })
            .catch((error) => console.log("error" + error));
    };

    return (
        <Fragment>
            <Header />
            <div
                className={
                    checkCamera == true
                        ? "overlayContainer"
                        : "overlayContainer hiddenUpFile"
                }
            ></div>
            <div
                className={
                    checkCamera == true
                        ? "upFileContainer"
                        : "upFileContainer hiddenUpFile"
                }
            >
                <div className="containerImgTop">
                    <h2 className="titleUpImg">Cập nhật ảnh đại diện</h2>
                    <AiFillCloseCircle
                        className="iconClose"
                        onClick={handleCloseUpFile}
                    />
                </div>
                <div className="containerImgBottom">
                    <input
                        type="file"
                        className="selectImg"
                        id="actual-btn"
                        onChange={handleUpLoad}
                        hidden
                    ></input>
                    <button className="uploadButton">
                        <label for="actual-btn">Choose File</label>
                    </button>
                    {imageSrc ? (
                        <img src={imageSrc} className="setUpSizeImg" alt="" />
                    ) : null}

                    <button className="confirmButton" onClick={handleConfirm}>
                        <label>Confirm</label>
                    </button>
                </div>
            </div>
            <div>
                <div className="containerProfile">
                    <div className="containerIntro">
                        <div className="intro_top">
                            <img
                                className="intro_top_img"
                                src="https://wallpaperaccess.com/full/1235065.jpg"
                                alt=""
                            />
                            <div className="overlayImg"></div>
                            <div className="intro_detailsUser">
                                <div className="circleImg">
                                    <img
                                        className="userImg"
                                        src={
                                            localStorage.getItem(
                                                "profilePic"
                                            ) != ""
                                                ? "http://localhost:8081/api/file/getImg?path=" +
                                                  localStorage.getItem(
                                                      "profilePic"
                                                  )
                                                : "https://tse3.mm.bing.net/th?id=OIP.CiC4AzdlWzYcj2j65RM33AAAAA&pid=Api&P=0"
                                        }
                                        alt=""
                                    />
                                    <div className="circleCamera">
                                        <AiFillCamera
                                            className="iconCamera"
                                            onClick={handleUpFile}
                                        />
                                    </div>
                                </div>
                                <div className="detailsUser">
                                    <h2 className="detailsUser_Name">
                                        {localStorage.getItem("username")}
                                    </h2>
                                    <p className="detailsUser_Email">
                                        {localStorage.getItem("email")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="containerDonors">
                    <div className="container">
                        <h1 className="Donors">Donors</h1>
                        <ul className="listDonors">
                            <li className="donorOne">
                                <img
                                    className="donorImgSize"
                                    src="https://my-list.ml/img/logo/tmdb-logo-square.png"
                                    alt=""
                                />
                            </li>

                            <li className="donorOne">
                                <img
                                    className="donorImgSize"
                                    src="https://i1.wp.com/letstalkhair.tv/wp-content/uploads/2019/07/imdb_logo_png_699617.png?resize=506%2C500&ssl=1"
                                    alt=""
                                />
                            </li>

                            <li className="donorOne">
                                <img
                                    className="donorImgSize"
                                    src="https://www.vectorico.com/download/social_media/youtube-red-squircle.png"
                                    alt=""
                                />
                            </li>

                            <li className="donorOne">
                                <img
                                    className="donorImgSize"
                                    src="https://yt3.ggpht.com/a/AATXAJyzyrPJMwSCUxtTlY-MQ9sEqX8XHm8MYq4yr7e6Gw=s900-c-k-c0xffffffff-no-rj-mo"
                                    alt=""
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <footer className="footerMovie">
                    <div className="container footerTitle">
                        <div className="grid">
                            <div className="row">
                                <div className="col l-2-4">
                                    <h1 className="footerHead">ReelZool</h1>
                                    <button type="button" className="btn-user">
                                        <h4 className="titleBtn">
                                            Hi{" "}
                                            {localStorage.getItem("username")}!
                                        </h4>
                                    </button>
                                </div>
                                <div className="col l-2-4">
                                    <h4 className="theName">THE BASICS</h4>
                                    <ul className="listItemFoot">
                                        <li className="itemFoot">About RZ</li>
                                        <li className="itemFoot">Contact Us</li>
                                        <li className="itemFoot">
                                            Support Forums
                                        </li>
                                        <li className="itemFoot">
                                            System Status
                                        </li>
                                    </ul>
                                </div>
                                <div className="col l-2-4">
                                    <h4 className="theName">GET INVOLVED</h4>
                                    <ul className="listItemFoot">
                                        <li className="itemFoot">
                                            Contribution Bible
                                        </li>
                                        <li className="itemFoot">
                                            Add Popular
                                        </li>
                                        <li className="itemFoot">
                                            Add Top Rated
                                        </li>
                                        <li className="itemFoot">
                                            Add Upcoming
                                        </li>
                                    </ul>
                                </div>
                                <div className="col l-2-4">
                                    <h4 className="theName">COMMUNITY</h4>
                                    <ul className="listItemFoot">
                                        <li className="itemFoot">Facebook</li>
                                        <li className="itemFoot">Instagram</li>
                                        <li className="itemFoot">Twitter</li>
                                        <li className="itemFoot">Tiktok</li>
                                    </ul>
                                </div>
                                <div className="col l-2-4">
                                    <h4 className="theName">LEGAL</h4>
                                    <ul className="listItemFoot">
                                        <li className="itemFoot">
                                            Terms of Use
                                        </li>
                                        <li className="itemFoot">
                                            Privacy Policy
                                        </li>
                                        <li className="itemFoot">About RZ</li>
                                        <li className="itemFoot">About RZ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Fragment>
    );
}

export default Profile;
