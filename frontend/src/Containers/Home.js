import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ReactSearchBox from "react-search-box";
import HomeIcon from "@mui/icons-material/Home";
import Restaurant from "../Components/Resturant";





const Home = ({ resturants, setResturantID }) => {
    const [hintText, setHintText] = useState("Select ypur resturant");

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: 60,
                    boxShadow: 2,
                    backgroundColor: "primary.main",
                    color: "primary.text",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <HomeIcon color="primary.text" sx={{ position: "relative" }} />
                Home
            </Box>

            <div className="img-containe">
                {/* <div className="Homepage-Img" > */}
                <img className="Homepage-Img" src={'quickorder.jpeg'} alt="Background" />
                {/* </div> */}
            </div>
            <div>
                {hintText}
            </div>
            {
                resturants.map((item, idx) => (

                    <div key={idx}>
                        {/* ${item.name} */}
                        <Restaurant restaurant={item} setResturantID={setResturantID} setHintText={setHintText} />
                    </div>
                ))

            }
        </ >


    );

}

export default Home;