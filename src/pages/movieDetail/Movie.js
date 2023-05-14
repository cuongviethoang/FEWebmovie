import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineFieldTime, AiFillLike, AiFillDislike } from "react-icons/ai";

import Header from "../../components/Header/Header";
import ReactPlayer from "react-player";
import axios from "axios";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [currentComment, setComment] = useState([]);
    const [valueInput, setValueInput] = useState("");
    const [currentLike, setLike] = useState([]);
    const [currentDis, setDislike] = useState([]);

    const API_LINK = "http://localhost:8081/api/file/getImg";

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
        getComment();
        getLike();
        getDislike();
        window.scrollTo(0, 0);
    }, []);

    const getData = () => {
        axios
            .get(`http://localhost:8081/api/movie/${id}`, {
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
                setMovie(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const getComment = () => {
        axios
            .get(`http://localhost:8081/api/movies/${id}/comments`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                return response.data;
            })
            .then((result) => {
                setComment(result);
                return result;
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const getLike = () => {
        axios
            .get(`http://localhost:8081/api/movie/${id}/likes`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setLike(res.data);
                console.log(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const getDislike = () => {
        axios
            .get(`http://localhost:8081/api/movie/${id}/dislikes`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setDislike(res.data);
                console.log(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleLike = () => {
        axios
            .post(
                `http://localhost:8081/api/movie/${id}/like`,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                return res.data;
            })
            .then((result) => {
                getLike();
                return result;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleDislike = () => {
        axios
            .post(
                `http://localhost:8081/api/movie/${id}/dislike`,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                return res.data;
            })
            .then((result) => {
                getDislike();
                return result;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleChangInput = (e) => {
        setValueInput(e.target.value);
    };

    const shouldEnableCommentButton = () => {
        return valueInput.trim() !== "";
    };

    const handleClickPost = () => {
        axios
            .post(
                `http://localhost:8081/api/movies/${id}/comments`,
                {
                    content: valueInput,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                return res.data;
            })
            .then((result) => {
                getComment();
                setValueInput("");
                return result;
            })
            .catch((error) => console.log("error: ", error));
    };

    return (
        <>
            <Header />
            <div className="movie">
                <div className="movie__intro">
                    <img
                        alt=""
                        className="movie__backdrop"
                        src={
                            currentMovieDetail
                                ? currentMovieDetail.backdrop_path
                                : ""
                        }
                    />
                </div>
                <div className="movie__detail">
                    <div className="movie__detailLeft">
                        <div className="movie__posterBox">
                            <img
                                alt=""
                                className="movie__poster"
                                src={
                                    currentMovieDetail
                                        ? currentMovieDetail.poster_path
                                        : ""
                                }
                            />
                            <div className="movie__mobile_details">
                                <div className="movie__name">
                                    {currentMovieDetail
                                        ? currentMovieDetail.original_title
                                        : ""}
                                </div>
                                <div className="movie__runtime movie__mobile_runtime">
                                    <AiOutlineFieldTime className="time_icon" />
                                    <span>
                                        {currentMovieDetail
                                            ? currentMovieDetail.runtime +
                                              " mins"
                                            : ""}
                                    </span>
                                </div>
                                <div className="movie__mobile_geners">
                                    <span>Genres: </span>
                                    {currentMovieDetail
                                        ? currentMovieDetail.geners.map(
                                              (genre, index) => (
                                                  <span
                                                      key={index}
                                                      className="gener_name"
                                                  >
                                                      {genre.name}
                                                  </span>
                                              )
                                          )
                                        : ""}
                                </div>
                            </div>
                        </div>
                        <div className="saveMovieInStore">
                            <button className="btnSave">Save Movie</button>
                        </div>
                        <div className="reactUser">
                            <div
                                className="react reactLike"
                                onClick={handleLike}
                            >
                                <AiFillLike className="iconLike" />
                                <label className="numReact">
                                    {currentLike.length}
                                </label>
                            </div>
                            <div
                                className="react reactDis"
                                onClick={handleDislike}
                            >
                                <AiFillDislike className="iconDislike" />
                                <label className="numReact">
                                    {currentDis.length}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="movie__detailRight">
                        <div className="movie__detailRightTop">
                            <div className="movie__name">
                                {currentMovieDetail
                                    ? currentMovieDetail.original_title
                                    : ""}
                            </div>
                            <div className="movie__tagline">
                                {currentMovieDetail
                                    ? currentMovieDetail.tagline
                                    : ""}
                            </div>
                            <div className="movie__rating">
                                {currentMovieDetail
                                    ? currentMovieDetail.vote_average
                                    : ""}{" "}
                                <i className="fas fa-star" />
                                <span className="movie__voteCount">
                                    {currentMovieDetail
                                        ? "(" +
                                          currentMovieDetail.vote_count +
                                          ") votes"
                                        : ""}
                                </span>
                            </div>
                            <div className="movie__runtime">
                                {currentMovieDetail
                                    ? currentMovieDetail.runtime + " mins"
                                    : ""}
                            </div>
                            <div className="movie__releaseDate">
                                {currentMovieDetail
                                    ? "Release date: " +
                                      currentMovieDetail.release_date
                                    : ""}
                            </div>
                            <div className="movie__genres">
                                {currentMovieDetail && currentMovieDetail.geners
                                    ? currentMovieDetail.geners.map(
                                          (genre, index) => (
                                              <span
                                                  className="movie__genre"
                                                  id={genre.id}
                                                  key={index}
                                              >
                                                  {genre.name}
                                              </span>
                                          )
                                      )
                                    : ""}
                            </div>
                        </div>
                        <div className="movie__detailRightBottom">
                            <div className="synopsisText">Synopsis</div>
                            <div>
                                {currentMovieDetail
                                    ? currentMovieDetail.overview
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="movieTrailer">
                    <h1 className="titleTrailer">Trailer</h1>
                    <ReactPlayer
                        url={
                            currentMovieDetail
                                ? currentMovieDetail.link_trailer
                                : ""
                        }
                        playing={false}
                        controls={true}
                        muted={true}
                        width={"1500px"}
                        height={"845px"}
                    />
                </div>
                <div className="movieMovie">
                    <h1 className="titleMovie">Movie</h1>
                    <ReactPlayer
                        url={
                            currentMovieDetail
                                ? currentMovieDetail.link_movie
                                : ""
                        }
                        playing={false}
                        controls={true}
                        muted={true}
                        width={"1500px"}
                        height={"845px"}
                    />
                </div>

                <div className="containerComment">
                    <div className="containerTop">
                        <img
                            className="containerImg"
                            src={
                                localStorage.getItem("profilePic") != null
                                    ? "http://localhost:8081/api/file/getImg?path=" +
                                      localStorage.getItem("profilePic")
                                    : "https://tse3.mm.bing.net/th?id=OIP.CiC4AzdlWzYcj2j65RM33AAAAA&pid=Api&P=0"
                            }
                            alt=""
                        />
                        <div className="containerInput">
                            <input
                                className="inputType activeInput"
                                placeholder="Viết bình luận..."
                                value={valueInput}
                                onChange={handleChangInput}
                            />
                            <div className="containerBtn">
                                <button
                                    className="deleteBtn"
                                    disabled={!shouldEnableCommentButton()}
                                >
                                    <label>Hủy</label>
                                </button>
                                <button
                                    className={
                                        !shouldEnableCommentButton()
                                            ? "submitBtn"
                                            : "submitBtn activeBtn"
                                    }
                                    onClick={handleClickPost}
                                    disabled={!shouldEnableCommentButton()}
                                >
                                    <label>Bình luận</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="containerBottom">
                        {currentComment.map((comment, index) => (
                            <div className="containerCommentUser" key={index}>
                                <img
                                    className="containerImg"
                                    src={
                                        comment.imgUser != ""
                                            ? "http://localhost:8081/api/file/getImg?path=" +
                                              comment.imgUser
                                            : "https://tse3.mm.bing.net/th?id=OIP.CiC4AzdlWzYcj2j65RM33AAAAA&pid=Api&P=0"
                                    }
                                    alt=""
                                />
                                <div className="containerUserOther">
                                    <div className="infoUser">
                                        <h4 className="nameUser">
                                            {comment.username}
                                        </h4>
                                        <p className="datePost">
                                            {comment.date}
                                        </p>
                                        <p className="datePost">
                                            {comment.time}
                                        </p>
                                    </div>
                                    <div className="contentPost">
                                        <p className="titleConent">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Movie;
