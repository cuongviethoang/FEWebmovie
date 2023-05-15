import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/Movie";
import FormSM from "./components/FormLogin/FormSM";
import FormLG from "./components/FormLogin/FormLG";
import Profile from "./components/Profile/Profile";
import SelectManager from "./components/selectManager/SelectManager";
import DeleteMovie from "./components/deleteMovie/DeleteMovie";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="Home" element={<Home />}></Route>
                    <Route path="movie/:id" element={<Movie />}></Route>
                    <Route path="movies/:type" element={<MovieList />}></Route>
                    <Route path="/*" element={<h1>Error Page</h1>}></Route>
                    <Route path="FormSM" element={<FormSM />}></Route>
                    <Route path="FormLG" element={<FormLG />}></Route>
                    <Route path="Profile" element={<Profile />}></Route>
                    <Route
                        path="SelectManager"
                        element={<SelectManager />}
                    ></Route>
                    <Route path="DeleteMovie" element={<DeleteMovie />}></Route>
                    <Route index element={<FormLG />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
