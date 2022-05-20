import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Paper } from "@mui/material";
import { FormattedMessage } from "react-intl";

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
          key="home"
          label={
            <FormattedMessage id="bottomnav.home" defaultMessage="Restaurant" />
          }
          value="/home"
          icon={<HomeIcon />}
          component={Link}
          to="/home"
        />
        <BottomNavigationAction
          key="menu"
          label={<FormattedMessage id="bottomnav.menu" defaultMessage="Menu" />}
          value="/menu"
          icon={<MenuIcon />}
          component={Link}
          to="/menu"
        />
        <BottomNavigationAction
          key="cart"
          label={<FormattedMessage id="bottomnav.cart" defaultMessage="Cart" />}
          value="/cart"
          icon={<ShoppingCart />}
          component={Link}
          to="/cart"
        />
        <BottomNavigationAction
          key="orders"
          label={<FormattedMessage id="bottomnav.orders" defaultMessage="Orders" />}
          value="/orders"
          icon={<ArticleIcon />}
          component={Link}
          to="/orders"
        />
        <BottomNavigationAction
          key={authed ? "logout" : "login"}
          label={
            authed ? (
              <FormattedMessage id="bottomnav.logout" defaultMessage="Logout" />
            ) : (
              <FormattedMessage id="bottomnav.login" defaultMessage="Login" />
            )
          }
          value="/"
          icon={authed ? <LogoutIcon /> : <LoginIcon />}
          component={Link}
          to="/"
        />
      </BottomNavigation>
    </Paper>
  );
}
