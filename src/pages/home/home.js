import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:8081/api/movies/popular")
    //         .then((res) => res.json())
    //         .then((data) => setPopularMovies(data));
    // }, []);

    const navigate = useNavigate();

    useEffect(() => {
        loadDataProfile();
    }, []);

    const loadDataProfile = () => {
        axios
            .get("http://localhost:8081/api/movies/popular", {
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
                console.log(result);
                setPopularMovies(result);
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
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {popularMovies.map((movie) => (
                        <Link
                            key={movie.id}
                            style={{ textDecoration: "none", color: "white" }}
                            to={`/movie/${movie.id}`}
                        >
                            <div className="posterImage">
                                <img
                                    className="home_backdropPath"
                                    src={movie.backdrop_path}
                                    alt=""
                                />
                                <img
                                    className="home_posterPath"
                                    src={movie.poster_path}
                                    alt=""
                                />
                            </div>
                            <div className="posterImage__overlay">
                                <div className="posterImage__title">
                                    {movie ? movie.original_title : ""}
                                </div>
                                <div className="posterImage__runtime">
                                    {movie ? movie.release_date : ""}
                                    <span className="posterImage__rating">
                                        {movie ? movie.vote_average : ""}
                                        <i className="fas fa-star" />{" "}
                                    </span>
                                </div>
                                <div className="posterImage__description">
                                    {movie ? movie.overview : ""}
                                </div>
                            </div>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default Home;
