import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams, useNavigate } from "react-router-dom";
import Cards from "../card/card";
import { AiOutlineSearch } from "react-icons/ai";
import Header from "../Header/Header";
import axios from "axios";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [checkActive, setCheckActive] = useState(false);
    const { type } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        setCheckActive(!checkActive);
    };

    useEffect(() => {
        getData(); // lấy ra type sau path="link/: type"
    }, [type]);

    const getData = () => {
        axios
            .get(
                `http://localhost:8081/api/movies/${type ? type : "popular"}`,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((response) => {
                if (response.status == 200) {
                    return response.data;
                }
                throw Error(response.status);
            })
            .then((result) => {
                setMovieList(result);
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
        navigate("/FormLG");
    };

    return (
        <>
            <Header />
            <div className="movie__list">
                <div className="list__title__search">
                    <h2 className="list__title">
                        {(type ? type : "POPULAR").toUpperCase()}
                    </h2>
                    <div
                        className={
                            checkActive ? "list__search active" : "list__search"
                        }
                    >
                        <input
                            type="text"
                            placeholder="Search movie"
                            className="input__search"
                        ></input>
                        <AiOutlineSearch
                            className="icon__search"
                            onClick={handleClick}
                        />
                    </div>
                </div>
                <div className="list__cards">
                    {movieList.map((movie) => (
                        <Cards key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MovieList;
