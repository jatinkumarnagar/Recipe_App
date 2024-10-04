import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const NavbarButton = ({ onClick, isActive, label }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn me-2 ${isActive ? "btn-primary" : "btn-outline-primary"}`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isSignupActive, setIsSignupActive] = useState(false);

  const handleClickLoginButton = () => {
    setIsLoginActive(true);
    setIsSignupActive(false);
    navigate("/login");
  };

  const handleClickRegisterButton = () => {
    setIsLoginActive(false);
    setIsSignupActive(true);
    navigate("/register");
  };

  const handleLogout = () => {
    setCookies(["access_token"]);
    window.localStorage.removeItem("userID");
    navigate('/login');
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <div>
      <div className="container-fluid shadow">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          {/* {Brand Logo} */}
          <div className="col-md-3 mb-2 mb-md-0">
            <Link
              to="/"
              className="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <h2>Recipe App</h2>
            </Link>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link
                to="/"
                className={`nav-link px-2 ${
                  isActiveLink("/") ? "text-primary" : "active link-secondary"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/create-recipes"
                className={`nav-link px-2 ${
                  isActiveLink("/create-recipes")
                    ? "text-primary"
                    : "active link-secondary"
                }`}
              >
                Create Recipes
              </Link>
            </li>
            <li>
              <Link
                to="/saved-recipes"
                className={`nav-link px-2 ${
                  isActiveLink("/saved-recipes")
                    ? "text-primary"
                    : "active link-secondary"
                }`}
              >
                Saved Recipes
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className={`nav-link px-2 ${
                  isActiveLink("/contact-us")
                    ? "text-primary"
                    : "active link-secondary"
                }`}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="col-md-3 text-end">
            {!cookies.access_token ? (
              <>
                <NavbarButton
                  onClick={handleClickLoginButton}
                  isActive={isLoginActive}
                  label={"Login"}
                />
                <NavbarButton
                  onClick={handleClickRegisterButton}
                  isActive={isSignupActive}
                  label={"Sign-up"}
                />
              </>
            ) : (
              <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
