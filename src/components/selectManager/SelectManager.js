import React from "react";
import "./SelectManager.css";
import { useNavigate } from "react-router-dom";

function SelectManager() {
    const navigate = useNavigate();

    const handleBackProfile = () => {
        navigate("/Profile");
    };
    const handleSelectDelete = () => {
        navigate("/DeleteMovie");
    };
    return (
        <div className="containerSelect">
            <h1 className="titleSelect">MANAGER MOVIE</h1>
            <button className="backProfile" onClick={handleBackProfile}>
                Quay về trang chủ
            </button>
            <div className="container btnContainer">
                <button>Thêm phim</button>
                <button>Sửa phim</button>
                <button onClick={handleSelectDelete}>Xóa phim</button>
            </div>
        </div>
    );
}

export default SelectManager;
