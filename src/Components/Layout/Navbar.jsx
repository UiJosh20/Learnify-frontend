import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();

  return (
    <>
      <nav className="bg-gradient-to-r from-slate-900 to-slate-950 text-white flex justify-between items-center lg:px-10 lg:py-7 fixed top-0 w-screen z-50 p-2">
        <div>
          <Link to="/home">
            <p className="logo">Learnify</p>
          </Link>
        </div>
        <div className="flex lg:gap-5 lg:me-10">
          <Button
            id="home-button"
            className={`nav-button ${location.pathname === '/home' ? 'active' : ''}`}
            component={Link}
            to="/home"
          >
            Home
          </Button>
          <Button
            id="portal-button"
            className={`nav-button ${location.pathname.startsWith('/user') || location.pathname.startsWith('/admin') ? 'active' : ''}`}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            E-Portal
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "portal-button",
            }}
          >
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/admin/login"
            >
              Staff
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/user/login"
            >
              Student
            </MenuItem>
          </Menu>
          <Button
            id="about-button"
            className={`nav-button ${location.pathname === '/about' ? 'active' : ''}`}
            component={Link}
            to="/about"
          >
            About
          </Button>
          <Button
            id="news-button"
            className={`nav-button ${location.pathname === '/news' ? 'active' : ''}`}
            component={Link}
            to="/news"
          >
            News
          </Button>

         
        </div>
      </nav>
    </>
  );
};

export default Navbar;