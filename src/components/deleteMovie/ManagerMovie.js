import React from "react";
import "./ManagerMovie.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function DeleteMovie() {
    const [listMovie, setListMovie] = useState([]);
    const [valueInput, setValueInput] = useState([]);
    const [movieDetail, setMovieDetail] = useState({});
    const [checkAlert, setCheckAlert] = useState(false);
    const [checkAlertAdd, setCheckAlertAdd] = useState(false);
    const [checkAlertAddGenreAndEdit, setCheckAlertAddGenreAndEdit] =
        useState(false);
    const [checkEditMovie, setCheckEditMovie] = useState(false);
    const [checkAddGenre, setCheckAddGenre] = useState(false);
    const [ipOriginal, setIpOriginal] = useState("");
    const [ipBackdrop, setIpBackdrop] = useState("");
    const [ipPoster, setIpPoster] = useState("");
    const [ipRelease, setIpRelease] = useState("");
    const [ipVCount, setIpVCount] = useState(0);
    const [ipVAverage, setIpVAverage] = useState(0);
    const [ipTagline, setIpTagline] = useState("");
    const [ipOverview, setIpOverview] = useState("");
    const [ipRuntime, setIpRuntime] = useState(0);
    const [ipTrailer, setIpTrailer] = useState("");
    const [ipMovie, setIpMovie] = useState("");
    const [ipGenre, setIpGenre] = useState("");

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
        navigate("/Profile");
    };

    const handleAlertDel = (movie) => {
        setCheckAlert(true);
        setMovieDetail(movie);
    };

    const handleYesDel = () => {
        axios
            .delete(`http://localhost:8081/api/movies/${movieDetail.id}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                alert("Xóa phim thành công");
                setCheckAlert(false);
                getData();
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleNoDel = () => {
        setCheckAlert(false);
    };

    const handleAlertAdd = () => {
        setIpBackdrop("");
        setIpMovie("");
        setIpOriginal("");
        setIpOverview("");
        setIpPoster("");
        setIpRelease("");
        setIpRuntime(0);
        setIpTagline("");
        setIpTrailer("");
        setIpVAverage(0);
        setIpVCount(0);
        setCheckAlertAdd(true);
    };

    const handleYesAddMovie = () => {
        axios
            .post(
                "http://localhost:8081/api/movies",
                {
                    backdrop_path: ipBackdrop,
                    original_title: ipOriginal,
                    overview: ipOverview,
                    poster_path: ipPoster,
                    release_date: ipRelease,
                    vote_average: ipVAverage,
                    vote_count: ipVCount,
                    runtime: ipRuntime,
                    tagline: ipTagline,
                    link_trailer: ipTrailer,
                    link_movie: ipMovie,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("thêm phim thanh công");
                getData();
                setCheckAlertAdd(false);
                return res.data;
            })
            .catch((error) => alert(error));
    };

    const handleNoAddMovie = () => {
        setCheckAlertAdd(false);
    };

    const handleAlertAddGenre = (movie) => {
        setMovieDetail(movie);
        setCheckAddGenre(false);
        setCheckEditMovie(false);
        setCheckAlertAddGenreAndEdit(true);
    };

    const handleEditMovie = () => {
        setIpBackdrop(movieDetail.backdrop_path);
        setIpOriginal(movieDetail.original_title);
        setIpMovie(movieDetail.link_movie);
        setIpOverview(movieDetail.overview);
        setIpPoster(movieDetail.poster_path);
        setIpRelease(movieDetail.release_date);
        setIpRuntime(movieDetail.runtime);
        setIpTagline(movieDetail.tagline);
        setIpTrailer(movieDetail.link_trailer);
        setIpVAverage(movieDetail.vote_average);
        setIpVCount(movieDetail.vote_count);
        setCheckEditMovie(true);
        setCheckAddGenre(false);
    };

    const handleAddGenre = () => {
        setCheckAddGenre(true);
        setCheckEditMovie(false);
    };

    const handleYesEdit = () => {
        axios
            .put(
                `http://localhost:8081/api/movies/${movieDetail.id}`,
                {
                    backdrop_path: ipBackdrop,
                    original_title: ipOriginal,
                    overview: ipOverview,
                    poster_path: ipPoster,
                    release_date: ipRelease,
                    vote_average: ipVAverage,
                    vote_count: ipVCount,
                    runtime: ipRuntime,
                    tagline: ipTagline,
                    link_trailer: ipTrailer,
                    link_movie: ipMovie,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("Sửa phim thành công");
                setCheckAlertAddGenreAndEdit(false);
                getData();
                return res.data;
            })
            .catch((error) => alert(error));
    };

    const handleYesAddGenre = () => {
        axios
            .post(
                `http://localhost:8081/api/movies/${movieDetail.id}/geners`,
                {
                    name: ipGenre,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("thêm thể loại thành công");
                return res.data;
            })
            .catch((error) => alert(error));
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
                    <button onClick={handleAlertAdd}>Thêm phim mới</button>
                </div>
            </div>
            <div className="containerMovieInManager">
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

                        <div
                            className="cards__overlay"
                            onClick={() => handleAlertAddGenre(movie)}
                        >
                            <div className="card__title">
                                {movie.original_title}
                            </div>
                            <div className="card__runtime">
                                {movie.release_date}
                                <span className="card__rating">
                                    {movie.vote_average}
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
            <div className={checkAlert ? "overlayAlertDel" : ""}></div>
            <div className={checkAlert ? "alertDelete active" : "alertDelete"}>
                <h3 className="titleAccess">
                    Bạn có chắc chắn muốn xóa phim này không
                </h3>
                <div className="containerDetail">
                    <div className="propertyMovie">
                        <label>Id</label>
                        <input defaultValue={movieDetail.id} />
                    </div>
                    <div className="propertyMovie">
                        <label>Original_title</label>
                        <input defaultValue={movieDetail.original_title} />
                    </div>
                    <div className="propertyMovie">
                        <label>Backdrop_path</label>
                        <input defaultValue={movieDetail.backdrop_path} />
                    </div>
                    <div className="propertyMovie">
                        <label>Poster_path</label>
                        <input defaultValue={movieDetail.poster_path} />
                    </div>
                    <div className="propertyMovie">
                        <label>Release_date</label>
                        <input defaultValue={movieDetail.release_date} />
                    </div>
                    <div className="propertyMovie">
                        <label>Vote_count</label>
                        <input defaultValue={movieDetail.vote_count} />
                    </div>
                    <div className="propertyMovie">
                        <label>Vote_average</label>
                        <input defaultValue={movieDetail.vote_average} />
                    </div>
                    <div className="propertyMovie">
                        <label>Tagline</label>
                        <input defaultValue={movieDetail.tagline} />
                    </div>
                    <div className="propertyMovie">
                        <label>Overview</label>
                        <input defaultValue={movieDetail.overview} />
                    </div>
                    <div className="propertyMovie">
                        <label>Runtime</label>
                        <input defaultValue={movieDetail.runtime} />
                    </div>
                    <div className="propertyMovie">
                        <label>Link_trailer</label>
                        <input defaultValue={movieDetail.link_trailer} />
                    </div>
                    <div className="propertyMovie">
                        <label>Link_movie</label>
                        <input defaultValue={movieDetail.link_movie} />
                    </div>
                </div>
                <div className="yesOrNo">
                    <button onClick={handleYesDel}>Xác nhận</button>
                    <button onClick={handleNoDel}>Không</button>
                </div>
            </div>
            <div className={checkAlertAdd ? "overlayAlertDel" : ""}></div>
            <div
                className={checkAlertAdd ? "alertDelete active" : "alertDelete"}
            >
                <h3 className="titleAccess">
                    Bạn có chắc chắn muốn thêm phim này không
                </h3>
                <div className="containerDetail">
                    <div className="propertyMovie">
                        <label>Original_title</label>
                        <input
                            value={ipOriginal}
                            onChange={(e) => setIpOriginal(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Backdrop_path</label>
                        <input
                            value={ipBackdrop}
                            onChange={(e) => setIpBackdrop(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Poster_path</label>
                        <input
                            value={ipPoster}
                            onChange={(e) => setIpPoster(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Release_date</label>
                        <input
                            placeholder="DD/MM/YY"
                            value={ipRelease}
                            onChange={(e) => setIpRelease(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Vote_count</label>
                        <input
                            value={ipVCount}
                            onChange={(e) => setIpVCount(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Vote_average</label>
                        <input
                            value={ipVAverage}
                            onChange={(e) => setIpVAverage(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Tagline</label>
                        <input
                            value={ipTagline}
                            onChange={(e) => setIpTagline(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Overview</label>
                        <input
                            value={ipOverview}
                            onChange={(e) => setIpOverview(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Runtime</label>
                        <input
                            value={ipRuntime}
                            onChange={(e) => setIpRuntime(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Link_trailer</label>
                        <input
                            value={ipTrailer}
                            onChange={(e) => setIpTrailer(e.target.value)}
                        />
                    </div>
                    <div className="propertyMovie">
                        <label>Link_movie</label>
                        <input
                            value={ipMovie}
                            onChange={(e) => setIpMovie(e.target.value)}
                        />
                    </div>
                </div>
                <div className="yesOrNo">
                    <button onClick={handleYesAddMovie}>Xác nhận</button>
                    <button onClick={handleNoAddMovie}>Không</button>
                </div>
            </div>
            <div
                className={checkAlertAddGenreAndEdit ? "overlayAlertDel" : ""}
            ></div>
            <div
                className={
                    checkAlertAddGenreAndEdit
                        ? "alertAddGenreEdit active"
                        : "alertAddGenreEdit"
                }
            >
                <AiOutlineCloseCircle
                    className="iconCloseMovieStore"
                    onClick={() => setCheckAlertAddGenreAndEdit(false)}
                />
                <div className="btnAddGenreEdit">
                    <button onClick={handleAddGenre}>Thêm thể loại</button>
                    <button onClick={handleEditMovie}>Sửa phim</button>
                </div>
                <div
                    className={
                        checkAddGenre ? "alertAddGenre active" : "alertAddGenre"
                    }
                >
                    <h3 className="titleAccess">Thêm thể loại</h3>
                    <div className="containerDetail">
                        <div className="propertyMovie">
                            <label>Name</label>
                            <input
                                value={ipGenre}
                                onChange={(e) => setIpGenre(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="yesOrNo">
                        <button onClick={handleYesAddGenre}>Xác nhận</button>
                    </div>
                </div>
                <div
                    className={
                        checkEditMovie
                            ? "alertEditMovie active"
                            : "alertEditMovie"
                    }
                >
                    <h3 className="titleAccess">
                        Bạn có chắc chắn muốn sửa phim này không
                    </h3>
                    <div className="containerDetail">
                        <div className="propertyMovie">
                            <label>Original_title</label>
                            <input
                                value={ipOriginal}
                                onChange={(e) => setIpOriginal(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Backdrop_path</label>
                            <input
                                value={ipBackdrop}
                                onChange={(e) => setIpBackdrop(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Poster_path</label>
                            <input
                                value={ipPoster}
                                onChange={(e) => setIpPoster(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Release_date</label>
                            <input
                                value={ipRelease}
                                onChange={(e) => setIpRelease(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Vote_count</label>
                            <input
                                value={ipVCount}
                                onChange={(e) => setIpVCount(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Vote_average</label>
                            <input
                                value={ipVAverage}
                                onChange={(e) => setIpVAverage(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Tagline</label>
                            <input
                                value={ipTagline}
                                onChange={(e) => setIpTagline(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Overview</label>
                            <input
                                value={ipOverview}
                                onChange={(e) => setIpOverview(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Runtime</label>
                            <input
                                value={ipRuntime}
                                onChange={(e) => setIpRuntime(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Link_trailer</label>
                            <input
                                value={ipTrailer}
                                onChange={(e) => setIpTrailer(e.target.value)}
                            />
                        </div>
                        <div className="propertyMovie">
                            <label>Link_movie</label>
                            <input
                                value={ipMovie}
                                onChange={(e) => setIpMovie(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="yesOrNo">
                        <button onClick={handleYesEdit}>Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteMovie;
