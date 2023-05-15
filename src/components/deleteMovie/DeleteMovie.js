import React from "react";
import "./DeleteMovie.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function DeleteMovie() {
    const [listMovie, setListMovie] = useState([]);
    const [valueInput, setValueInput] = useState([]);
    const [movieDetail, setMovieDetail] = useState({});
    const [checkAlert, setCheckAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios
            .get("http://localhost:8081/api/movies", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setListMovie(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleSearch = () => {
        axios
            .get(
                "http://localhost:8081/api/movies/findMovie?name=" + valueInput,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                setListMovie(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleBackManager = () => {
        navigate("/SelectManager");
    };

    const handleAlertDel = (movie) => {
        setCheckAlert(true);
        setMovieDetail(movie);
    };

    return (
        <div className="containerDel">
            <div className="movieList">
                <div className="titleStoreMovie">
                    <span></span>
                    <p>DANH SÁCH PHIM</p>
                </div>
                <div className="btnAndSearch">
                    <input
                        placeholder="Nhập từ khóa tìm kiếm"
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                    />
                    <button onClick={handleSearch}>Tìm Kiếm</button>
                    <button onClick={handleBackManager}>
                        Quay lại ManagerMovie
                    </button>
                </div>
            </div>
            <div className="container">
                {listMovie.map((movie, index) => (
                    <div className="cardStore" key={index}>
                        <AiOutlineCloseCircle
                            className="iconCloseMovieStore"
                            onClick={() => handleAlertDel(movie)}
                        />
                        <img
                            alt=""
                            className="cards__img"
                            src={movie.poster_path}
                        />

                        <div className="cards__overlay">
                            <div className="card__title">
                                {movie.original_title}
                            </div>
                            <div className="card__runtime">
                                {movie.release_date}
                                <span className="card__rating">
                                    {movie.vot_average}
                                    <i className="fas fa-star" />
                                </span>
                            </div>
                            <div className="card__description">
                                {movie
                                    ? movie.overview.slice(0, 118) + "..."
                                    : ""}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div
                className={checkAlert ? "alertDelete active" : "alertDelete"}
            ></div>
        </div>
    );
}

export default DeleteMovie;
