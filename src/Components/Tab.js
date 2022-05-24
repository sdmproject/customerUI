// import * as React from "react";
import { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";

export default function TabBar({ items, dishType, setDishType, lang }) {
  const theme = useTheme();
  const CustomTab = withStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
    },
    selected: {
      backgroundColor: theme.palette.primary.dark,
    },
  })(Tab);

  // useEffect(() => {
  //   setDishType(items[items.indexOf(dishType));
  // }, [lang]);

  const handleChange = (event, newValue) => {
    // console.log(newValue);
    setDishType(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <Tabs
        sx={{ width: "100%" }}
        value={dishType}
        onChange={handleChange}
        variant={items.length > 4 ? "scrollable" : "fullWidth"}
        scrollButtons={false}
      >
        {items.map((item, index) => (
          <CustomTab label={item} value={index} />
        ))}
      </Tabs>
      <Divider></Divider>
    </Box>
  );
}
