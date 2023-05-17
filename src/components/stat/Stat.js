import React from "react";
import "./Stat.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Stat() {
    const navigate = useNavigate();
    const [listMovie, setListMovie] = useState([]);

    const handleBackProfile = () => {
        navigate("/Profile");
    };

    useEffect(() => {
        getDataAllMovie();
    }, []);

    const getDataAllMovie = () => {
        axios
            .get("http://localhost:8081/api/movie/stat", {
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

    return (
        <div className="containerStat">
            <div className="backProfile">
                <button onClick={handleBackProfile}>Quay về Profile</button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Original_title</th>
                            <th>Likes</th>
                            <th>Dislikes</th>
                            <th>Comments</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listMovie.map((movie, index) => (
                            <tr key={index}>
                                <td>{movie.id}</td>
                                <td>{movie.original_title}</td>
                                <td>{movie.likes}</td>
                                <td>{movie.dislikes}</td>
                                <td>{movie.comments}</td>
                                <td>
                                    <Link
                                        to={`/movie/${movie.id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button className="btn btn-primary">
                                            View
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Stat;
