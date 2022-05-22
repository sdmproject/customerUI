import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function Intl({ setLang }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      setLang("en");
    } else {
      setLang("zh");
    }
    console.log(checked);
  }, [checked, setLang]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ position: "fixed", top: 70, right: 12, zIndex: 101 }}
    >
      <Typography>中文</Typography>
      <AntSwitch
        inputProps={{ "aria-label": "ant design" }}
        checked={checked}
        onChange={handleChange}
      />
      <Typography>English</Typography>
    </Stack>
  );
}
