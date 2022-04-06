import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";

export default function TabBar({ items, dishType, setDishType }) {
  const theme = useTheme();
  const CustomTab = withStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
    },
    selected: {
      backgroundColor: theme.palette.primary.dark,
    },
  })(Tab);

  const handleChange = (event, newValue) => {
    setDishType(newValue);
    // console.log(newValue)
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: 350, sm: 500 },
        bgcolor: "background.paper",
        // margin: "auto",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <Tabs
        sx={{ width: "100%" }}
        // centered
        value={dishType}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
      >
        {items.map((item) => (
          <CustomTab
            // sx={{ backgroundColor: theme.palette.primary }}
            // fullWidth
            label={item}
            value={item}
          />
        ))}
      </Tabs>
      <Divider></Divider>
    </Box>
  );
}
