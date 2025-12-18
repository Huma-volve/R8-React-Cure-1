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
import DoctorCard from "@/Components/Cards/DoctorCard";

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

type ApiDoctor = {
  id: number;
  name: string;
  specialty: string;
  avatar: string | null;
  rating: number;
  price: string; 
  hospital_name: string;
  times: any[]; 
};

type SpecialtySuggestion = { type: "specialty"; label: string };

type DoctorCardModel = {
  id?: number;
  image: any;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  startTime: string;
  endTime: string;
  price?: number;
};

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

// -------------------- helpers --------------------
function parseTimesToRange(times: any[]): { startTime: string; endTime: string } {
  // Your API returns times: [] currently. When you know the shape, we can parse properly.
  if (!times || times.length === 0) return { startTime: "—", endTime: "—" };
  return { startTime: "—", endTime: "—" };
}

function toDoctorCardModel(d: ApiDoctor): DoctorCardModel {
  const { startTime, endTime } = parseTimesToRange(d.times);

  return {
    id: d.id,
    name: d.name,
    specialty: d.specialty,
    hospital: d.hospital_name,
    rating: Number(d.rating ?? 0),
    image: d.avatar, // DoctorCard will fallback to placeholder if null
    startTime,
    endTime,
    price: Number(d.price ?? 0),
  };
}


//api here
async function fetchSuggestions(query: string): Promise<{
  doctors: DoctorCardModel[];
  specialties: SpecialtySuggestion[];
}> {
  try {
    const response = await api.post("/search", { content: query });

    const doctorsRaw: ApiDoctor[] = response.data?.data ?? [];

    const doctors = doctorsRaw.map(toDoctorCardModel);

    const uniqueSpecialties = Array.from(
      new Set(doctorsRaw.map((x) => x.specialty).filter(Boolean))
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

  const [doctorResults, setDoctorResults] = useState<DoctorCardModel[]>([]);
  const [specialtyResults, setSpecialtyResults] = useState<SpecialtySuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const hasQuery = !!query.trim();

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

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter") {
      const q = query.trim();
      if (!q) return;
      setOpen(false);
      onSelect?.(q);
    }
  };

  const pickDoctor = (doc: DoctorCardModel) => {
    setQuery(doc.name);
    setOpen(false);
    onSelect?.(doc.name);
  };

  const pickSpecialty = (name: string) => {
    setQuery(name);
    setOpen(false);
    onSelect?.(name);
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
                {hasQuery ? (
                  <>
                    {loading && (
                      <ListItemButton disabled>
                        <ListItemText primary="Loading..." primaryTypographyProps={{ fontSize: 14 }} />
                      </ListItemButton>
                    )}

                    {!loading && (
                      <>
                        {/* Doctors as cards */}
                        {doctorResults.length > 0 && (
                          <>
                            <Box sx={{ px: 2, py: 1.5 }}>
                              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                                Doctors
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                px: 2,
                                pb: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                maxHeight: 420,
                                overflowY: "auto",
                              }}
                            >
                              {doctorResults.map((doc) => (
                                <Box
                                  key={`doctor-${doc.id ?? doc.name}`}
                                  sx={{ cursor: "pointer" }}
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={() => pickDoctor(doc)}
                                >
                                  <DoctorCard doctor={doc as any} />
                                </Box>
                              ))}
                            </Box>
                          </>
                        )}

                        {/* Specialties (text) */}
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
                                onClick={() => pickSpecialty(item.label)}
                              >
                                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
                              </ListItemButton>
                            ))}
                          </>
                        )}

                        {doctorResults.length === 0 && specialtyResults.length === 0 && (
                          <ListItemButton disabled>
                            <ListItemText primary="No results" primaryTypographyProps={{ fontSize: 14 }} />
                          </ListItemButton>
                        )}

                        <Divider />
                        <ListItemButton
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            const q = query.trim();
                            if (!q) return;
                            setOpen(false);
                            onSelect?.(q);
                          }}
                        >
                          <ListItemText primary="View all results" primaryTypographyProps={{ fontSize: 14 }} />
                        </ListItemButton>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {RECENTS.map((item) => (
                      <ListItemButton
                        key={item.label}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pickSpecialty(item.label)}
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
                        onClick={() => pickSpecialty(item.label)}
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
