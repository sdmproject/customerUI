import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Paper } from "@mui/material";

export default function BottomNav({ authed }) {
  let location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    console.log(location.pathname);
    setValue(location.pathname);
  }, [value, location.pathname]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}
      elevation={6}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="/customerUI/home"
          icon={<HomeIcon />}
          component={Link}
          to="/customerUI/home"
        />
        <BottomNavigationAction
          key="menu"
          label="Menu"
          value="/customerUI/menu"
          icon={<MenuIcon />}
          component={Link}
          to="/customerUI/menu"
        />
        <BottomNavigationAction
          key="cart"
          label="Cart"
          value="/customerUI/cart"
          icon={<ShoppingCart />}
          component={Link}
          to="/customerUI/cart"
        />
        <BottomNavigationAction
          key={authed ? "logout" : "login"}
          label={authed ? "Logout" : "Login"}
          value="/"
          icon={authed ? <LogoutIcon /> : <LoginIcon />}
          component={Link}
          to="/"
        />
      </BottomNavigation>
    </Paper>
  );
}
