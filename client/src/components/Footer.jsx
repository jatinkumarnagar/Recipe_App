import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="container-fluid shadow">
        <footer className="py-3 mt-4 border-top border-primary ">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <Link to="/" className="nav-link px-2 text-body-secondary">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create-recipes" className="nav-link px-2 text-body-secondary">
                Create Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/saved-recipes" className="nav-link px-2 text-body-secondary">
                Saved Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us" className="nav-link px-2 text-body-secondary">
                Contact Us
              </Link>
            </li>
          </ul>
          <p className="text-center text-body-secondary">© Developed by Jatin Kumar Nagar</p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
