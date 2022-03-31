import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TabBar({items, dishType, setDishType}) {

  const handleChange = (event, newValue) => {
    setDishType(newValue);
	// console.log(newValue)
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper', margin:"auto" }}>
      <Tabs
        value={dishType}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
		{items.map(item=><Tab label={item} value={item}></Tab>)}
      </Tabs>
    </Box>
  );
}