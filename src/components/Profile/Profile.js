import React, { Fragment } from "react";
import Header from "../Header/Header";
import "../Profile/Profile.css";
import "../grid/grid.css";
import { AiFillCamera, AiOutlineCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import "../card/card.css";
import { Link } from "react-router-dom";

function Profile() {
    const [checkCamera, setCheckCamera] = useState(false);
    const [files, setFiles] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [store, setStore] = useState([]);

    useEffect(() => {
        getData();
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const getData = () => {
        axios
            .get("http://localhost:8081/api/localStores", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => res.data)
            .then((result) => {
                setStore(result);
                return result;
            })
            .catch((error) => console.log("error: ", error));
    };

    const deleteMovieInStore = (index) => {
        axios
            .delete(`http://localhost:8081/api/localStore/${index}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => res.data)
            .then((result) => {
                getData();
                return result;
            })
            .catch((error) => console.log("error: ", error));
    };

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
                    checkCamera
                        ? "overlayContainer"
                        : "overlayContainer hiddenUpFile"
                }
            ></div>
            <div
                className={
                    checkCamera
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
                                src="https://www.gamesvillage.it/wp-content/uploads/2020/04/ori-and-the-will-of-the-wisps-abilities-1920x1080.jpg"
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
                <div className="containerStore">
                    <div className="titleStoreMovie">
                        <span></span>
                        <p>STORE MOVIE</p>
                    </div>
                    <div className="containerMovie">
                        {store.map((movie, index) => (
                            <div className="cardStore" key={index}>
                                <AiOutlineCloseCircle
                                    className="iconCloseMovieStore"
                                    onClick={() => deleteMovieInStore(movie.id)}
                                />
                                <img
                                    alt=""
                                    className="cards__img"
                                    src={movie.moviePicture}
                                />
                                <Link
                                    to={`/movie/${movie.movieId}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                >
                                    <div className="cards__overlay">
                                        <div className="card__title">
                                            {movie.movieName}
                                        </div>
                                        <div className="card__runtime">
                                            {movie.releaseDate}
                                            <span className="card__rating">
                                                {movie.voteAverage}
                                                <i className="fas fa-star" />
                                            </span>
                                        </div>
                                        <div className="card__description">
                                            {movie
                                                ? movie.overview.slice(0, 118) +
                                                  "..."
                                                : ""}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
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
