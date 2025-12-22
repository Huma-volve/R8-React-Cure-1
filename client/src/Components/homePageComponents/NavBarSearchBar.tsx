import { useEffect, useMemo, useState } from "react";
import {
  Box,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

import Magnifer from "../../assets/NavBarIcons/Magnifer.svg";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "block",
  [theme.breakpoints.up("xs")]: {
    borderRadius: "10px",
    backgroundColor: "#F5F6F7",
    paddingLeft: "16px",
    paddingRight: "16px",
    marginRight: theme.spacing(3),
    width: "100%",
    maxWidth: 568,
  },
  [theme.breakpoints.up("md")]: {
    width: "568px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#05162C",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

type Suggestion = { label: string };

const RECENTS: Suggestion[] = [
  { label: "Dentist near me" },
  { label: "Dermatologist in Cairo" },
  { label: "Cardiology" },
];

const SPECIALTIES: Suggestion[] = [
  { label: "Dentistry" },
  { label: "Cardiology" },
  { label: "Dermatology" },
  { label: "ENT" },
];

export default function NavbarSearch({
  placeholder = "Search about speciality, doctor",
  onSelect,
}: {
  placeholder?: string;
  onSelect?: (value: string) => void;
}) {
  // ✅ store anchor element in state using callback ref (no ref.current in render)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [anchorWidth, setAnchorWidth] = useState<number>(568);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // ✅ keep popper width in sync with the search bar width
  useEffect(() => {
    if (!anchorEl) return;

    const update = () => setAnchorWidth(anchorEl.getBoundingClientRect().width);

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(anchorEl);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [anchorEl]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return RECENTS;
    return SPECIALTIES.filter((s) => s.label.toLowerCase().includes(q));
  }, [query]);

  const handlePick = (value: string) => {
    setQuery(value);
    setOpen(false);
    onSelect?.(value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter") {
      setOpen(false);
      onSelect?.(query.trim());
    }
  };

  return (
    <Box
      ref={setAnchorEl} // ✅ callback ref sets anchorEl state
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <img src={Magnifer} alt="MaginfierIcon" />
            </SearchIconWrapper>

            <StyledInputBase
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              onClick={() => setOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Popper
            open={open}
            anchorEl={anchorEl} // ✅ state value, not ref.current
            placement="bottom-start"
            modifiers={[
              { name: "offset", options: { offset: [0, 8] } },
              { name: "preventOverflow", options: { padding: 8 } },
            ]}
            sx={{ zIndex: (t) => t.zIndex.modal }}
          >
            <Paper
              elevation={10}
              sx={{
                width: anchorWidth,
                maxWidth: "calc(100vw - 16px)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                  {query.trim() ? "Results" : "Recent searches"}
                </Typography>
              </Box>

              <Divider />

              <List disablePadding>
                {suggestions.map((item) => (
                  <ListItemButton
                    key={item.label}
                    onMouseDown={(e) => e.preventDefault()} // keep focus while clicking
                    onClick={() => handlePick(item.label)}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 14 }}
                    />
                  </ListItemButton>
                ))}

                {!query.trim() && (
                  <>
                    <Divider />
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                        Popular specialties
                      </Typography>
                    </Box>
                    {SPECIALTIES.slice(0, 4).map((item) => (
                      <ListItemButton
                        key={`popular-${item.label}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handlePick(item.label)}
                      >
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{ fontSize: 14 }}
                        />
                      </ListItemButton>
                    ))}
                  </>
                )}
              </List>
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>
    </Box>
  );
}
