import { useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const placeholders = [
  "Search by location",
  "Search by specialty",
  "Search by doctor name",
];

export default function RotatingSearchInput() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);

    return () => window.clearInterval(id);
  }, []);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholders[index]}
      InputProps={{
        readOnly: true,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        sx: {
          borderRadius: "50px",
          pointerEvents: "none", // can't click/focus
        },
      }}
      inputProps={{
        tabIndex: -1,
      }}
    />
  );
}
