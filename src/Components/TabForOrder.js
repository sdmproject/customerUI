import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";

export default function TabBarForOrder({ items, type, setType }) {
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
    setType(newValue);
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
        value={type}
        onChange={handleChange}
        variant={items.length > 4 ? "scrollable" : "fullWidth"}
        scrollButtons={false}
      >
        {items.map((item) => (
          <CustomTab key={item} label={item} value={item} />
        ))}
      </Tabs>
      <Divider></Divider>
    </Box>
  );
}
