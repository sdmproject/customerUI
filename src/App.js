import "./App.css";
import { useState } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper } from "@mui/material";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#e2d45d",
    },
    secondary: {
      main: "#e2925d",
    },
    warning: {
      main: "#ade25d",
    },
    success: {
      main: "#5de2d5",
    },
    info: {
      main: "#5d6ae2",
    },
  },
});

function App() {
  const [value, setValue] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
