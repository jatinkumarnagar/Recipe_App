import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateRecipe from "./pages/CreateRecipe";
import SaveRecipes from "./pages/SaveRecipes";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLogin from "./pages/AuthLogin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Auth />}></Route>
          <Route path="/create-recipes" element={<CreateRecipe />}></Route>
          <Route path="/saved-recipes" element={<SaveRecipes />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
          <Route path="/login" element={<AuthLogin />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
