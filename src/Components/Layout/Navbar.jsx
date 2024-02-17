import * as React from "react";
import { Link } from "react-router-dom";
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

  return (
    <>
      <nav className="bg-slate-950 text-white flex justify-between lg:px-10 lg:py-7 fixed top-0 w-full z-50">
        <div>
        <Link to='/home'>
          <p>Learnify</p>
            </Link>
        </div>
        <div className="flex lg:gap-7">
        <Button
            id="fade-button"
            className="!bg-slate-950 !text-white"
          >
            <Link to='/home'>
            Home
            </Link>
          </Button>
          <Button
            id="fade-button"
            className="!bg-slate-950 !text-white"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            E-Portal
          </Button>
          <Button
            id="fade-button"
            className="!bg-slate-950 !text-white"
          >
            <Link to='/about'>
            About
            </Link>
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/admin/login">Staff</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/user/login">Student</Link>
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
