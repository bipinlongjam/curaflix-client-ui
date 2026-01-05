import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/new-logo3.png";
import "./styles/Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./../../redux/userSlice";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);      
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wrapperRef = useRef(null);   

  // toggle dropdown on icon click
  const handleToggleDropdown = (e) => {
    e.stopPropagation(); // avoid document click handler from immediately closing
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  // close dropdown if click outside
  useEffect(() => {
    function handleDocumentClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") setDropdownOpen(false);
    }

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // helper to close mobile menu when navigation happens
  const handleNavClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={handleNavClick}>
            <img src={logo} alt="CuraFlix Logo" className="logo-image" />
          </Link>
        </div>

        {/* Hamburger icon */}
        <div
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>

          <li><Link to="/" onClick={handleNavClick}>Home</Link></li>
          <li><Link to="/about" onClick={handleNavClick}>About</Link></li>
          <li><Link to="/contact" onClick={handleNavClick}>Contact Us</Link></li>

          {/* When NOT logged in */}
          {!user && (
            <>
              <li><Link to="/login" onClick={handleNavClick}>Login</Link></li>
              <li><Link to="/register" onClick={handleNavClick}>Register</Link></li>
            </>
          )}

          {/* When logged in: clickable icon with dropdown */}
          {user && (
            <li className="user-menu" ref={wrapperRef}>
              <div className="user-wrapper">
                <button
                  className="user-icon-button"
                  onClick={handleToggleDropdown}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-label="User menu"
                >
                  <FiUser size={20} />
                </button>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item" onClick={() => { handleNavClick(); setDropdownOpen(false); }}>
                      Profile
                    </Link>
                    <button
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
