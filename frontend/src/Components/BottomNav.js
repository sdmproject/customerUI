import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Paper } from "@mui/material";

export default function BottomNav() {
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname);

  useEffect(() => {
    const newpathname = window.location.pathname;
    setValue(newpathname);
  }, [value]);

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
          value="/home"
          icon={<HomeIcon />}
          component={Link}
          to="/home"
        />
        <BottomNavigationAction
          key="menu"
          label="Menu"
          value="/menu"
          icon={<MenuIcon />}
          component={Link}
          to="/menu"
        />
        <BottomNavigationAction
          key="cart"
          label="Cart"
          value="/cart"
          icon={<ShoppingCart />}
          component={Link}
          to="/cart"
        />
        <BottomNavigationAction
          key="favorites"
          label="Favorites"
          value="/favorites"
          icon={<FavoriteIcon />}
          component={Link}
          to="/favorites"
        />
      </BottomNavigation>
    </Paper>
  );
}
