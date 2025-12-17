import { useEffect, useState } from "react";
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
import api from "@/api/axios";
import Magnifer from "@/assets/NavBarIcons/Magnifer.svg";

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

// ✅ CHANGED: API response doctor shape (matches your JSON)
type DoctorFromApi = {
  id: number;
  name: string;
  specialty: string;
};

// ✅ CHANGED: two suggestion types (doctor + specialty)
type DoctorSuggestion = {
  type: "doctor";
  id: number;
  label: string;
  specialty: string;
};

type SpecialtySuggestion = {
  type: "specialty";
  label: string; // backend doesn't provide specialty id yet, so label is enough for now
};

type Suggestion = DoctorSuggestion | SpecialtySuggestion;

const RECENTS: { label: string }[] = [
  { label: "Dentist near me" },
  { label: "Dermatologist in Cairo" },
  { label: "Cardiology" },
];

const SPECIALTIES: { label: string }[] = [
  { label: "Dentistry" },
  { label: "Cardiology" },
  { label: "Dermatology" },
  { label: "ENT" },
];

// ✅ CHANGED: fetchSuggestions now returns doctors + derived specialties
async function fetchSuggestions(query: string): Promise<{
  doctors: DoctorSuggestion[];
  specialties: SpecialtySuggestion[];
}> {
  try {
    // ✅ CHANGED: use params; sends /search?q=...
    // If your backend expects "query" instead of "q", change this to: { params: { query } }
    const response = await api.post("/search", { content: query });

    // ✅ CHANGED: your doctors array is inside response.data.data
    const doctorsRaw: DoctorFromApi[] = response.data.data ?? [];

    const doctors: DoctorSuggestion[] = doctorsRaw.map((d) => ({
      type: "doctor",
      id: d.id,
      label: d.name,
      specialty: d.specialty,
    }));

    // ✅ CHANGED: derive specialties from returned doctors (unique list)
    const uniqueSpecialties = Array.from(
      new Set(doctorsRaw.map((d) => d.specialty).filter(Boolean))
    );

    const specialties: SpecialtySuggestion[] = uniqueSpecialties.map((name) => ({
      type: "specialty",
      label: name,
    }));

    return { doctors, specialties };
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return { doctors: [], specialties: [] };
  }
}

export default function NavbarSearch({
  placeholder = "Search about speciality, doctor",
  onSelect,
}: {
  placeholder?: string;
  onSelect?: (value: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [anchorWidth, setAnchorWidth] = useState<number>(568);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // ✅ CHANGED: state for API results + loading
  const [doctorResults, setDoctorResults] = useState<DoctorSuggestion[]>([]);
  const [specialtyResults, setSpecialtyResults] = useState<SpecialtySuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const hasQuery = !!query.trim(); // ✅ CHANGED

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

  // ✅ CHANGED: call API when user types (debounced)
  useEffect(() => {
    const q = query.trim();

    if (!q) {
      setDoctorResults([]);
      setSpecialtyResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const t = setTimeout(async () => {
      setLoading(true);
      const { doctors, specialties } = await fetchSuggestions(q);

      if (!cancelled) {
        setDoctorResults(doctors);
        setSpecialtyResults(specialties);
        setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  // ✅ CHANGED: handlePick now accepts a Suggestion, not string
  const handlePick = (item: Suggestion) => {
    setQuery(item.label);
    setOpen(false);

    // later you can route differently:
    // if (item.type === "doctor") navigate(`/doctors/${item.id}`)
    // if (item.type === "specialty") navigate(`/search?specialty=${item.label}`)
    onSelect?.(item.label);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter") {
      setOpen(false);
      onSelect?.(query.trim());
    }
  };

  return (
    <Box ref={setAnchorEl} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
            anchorEl={anchorEl}
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
                  {hasQuery ? "Results" : "Recent searches"}
                </Typography>
              </Box>

              <Divider />

              <List disablePadding>
                {/* ✅ CHANGED: When user typed -> show API doctors + specialties + view all */}
                {hasQuery ? (
                  <>
                    {/* Loading row */}
                    {loading && (
                      <ListItemButton disabled>
                        <ListItemText primary="Loading..." primaryTypographyProps={{ fontSize: 14 }} />
                      </ListItemButton>
                    )}

                    {!loading && (
                      <>
                        {/* Doctors section */}
                        {doctorResults.length > 0 && (
                          <>
                            <Box sx={{ px: 2, py: 1.5 }}>
                              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                                Doctors
                              </Typography>
                            </Box>

                            {doctorResults.map((item) => (
                              <ListItemButton
                                key={`doctor-${item.id}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handlePick(item)}
                              >
                                <ListItemText
                                  primary={item.label}
                                  secondary={item.specialty}
                                  primaryTypographyProps={{ fontSize: 14 }}
                                />
                              </ListItemButton>
                            ))}
                          </>
                        )}

                        {/* Specialties section */}
                        {specialtyResults.length > 0 && (
                          <>
                            <Divider />
                            <Box sx={{ px: 2, py: 1.5 }}>
                              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                                Specialties
                              </Typography>
                            </Box>

                            {specialtyResults.map((item) => (
                              <ListItemButton
                                key={`specialty-${item.label}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handlePick(item)}
                              >
                                <ListItemText
                                  primary={item.label}
                                  primaryTypographyProps={{ fontSize: 14 }}
                                />
                              </ListItemButton>
                            ))}
                          </>
                        )}

                        {/* No results */}
                        {doctorResults.length === 0 && specialtyResults.length === 0 && (
                          <ListItemButton disabled>
                            <ListItemText primary="No results" primaryTypographyProps={{ fontSize: 14 }} />
                          </ListItemButton>
                        )}

                        {/* View all */}
                        <Divider />
                        <ListItemButton
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setOpen(false);
                            onSelect?.(query.trim()); // you can navigate to a results page later
                          }}
                        >
                          <ListItemText
                            primary="View all results"
                            primaryTypographyProps={{ fontSize: 14 }}
                          />
                        </ListItemButton>
                      </>
                    )}
                  </>
                ) : (
                  /* ✅ CHANGED: When empty -> keep your RECENTS + Popular specialties */
                  <>
                    {RECENTS.map((item) => (
                      <ListItemButton
                        key={item.label}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setQuery(item.label);
                          setOpen(false);
                          onSelect?.(item.label);
                        }}
                      >
                        <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
                      </ListItemButton>
                    ))}

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
                        onClick={() => {
                          setQuery(item.label);
                          setOpen(false);
                          onSelect?.(item.label);
                        }}
                      >
                        <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
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
