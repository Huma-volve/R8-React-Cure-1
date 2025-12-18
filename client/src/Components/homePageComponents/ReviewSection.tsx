import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import homeReviewStar from "@/assets/images/homeReviewStar.svg";
import DoctorCard from "@/Components/Cards/DoctorCard";

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

type DoctorCardModel = {
  id?: number;
  image: any;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  startTime: string;
  endTime: string;
  // you can keep price here if your DoctorCard later displays it
  price?: number;
};

function parseTimesToRange(times: any[]): { startTime: string; endTime: string } {
  // If backend provides times later, parse it here.
  if (!times || times.length === 0) return { startTime: "—", endTime: "—" };
  return { startTime: "—", endTime: "—" };
}

function toDoctorCardModel(d: ApiDoctor): DoctorCardModel {
  const { startTime, endTime } = parseTimesToRange(d.times);

  return {
    id: d.id,
    image: d.avatar,
    name: d.name,
    specialty: d.specialty,
    hospital: d.hospital_name,
    rating: Number(d.rating ?? 0),
    startTime,
    endTime,
    price: Number(d.price ?? 0),
  };
}

export default function ReviewSection() {
  const [doctors, setDoctors] = useState<DoctorCardModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://round8-cure-php-team-two.huma-volve.com/api/reviews/doctors/top"
        );

        // Common shapes:
        // res.data.data -> array
        // res.data.data.data -> array
        const raw: ApiDoctor[] = res.data?.data?.data ?? res.data?.data ?? [];

        if (!cancelled) {
          setDoctors(raw.map(toDoctorCardModel));
        }
      } catch (e) {
        console.error("Failed to load top doctors:", e);
        if (!cancelled) setDoctors([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {/* Top Doctors header + button */}
      <Box
        display="flex"
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <Box>
          <Typography sx={{ fontSize: { xs: "20px", sm: "28px" }, fontWeight: 600 }}>
            Top-Rated Doctors Chosen by Patients
          </Typography>
          <Typography sx={{ color: "#7A8194", maxWidth: 520 }}>
            Explore our highest-rated doctors, trusted by real patients for their expertise, care, and service.
            Book with confidence today.
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/doctors/top" // change to your real "View All" route
          variant="outlined"
          sx={{ borderRadius: "10px", textTransform: "none" }}
        >
          View All
        </Button>
      </Box>

      {/* Horizontal cards row */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          scrollSnapType: "x mandatory",
          "& > *": { scrollSnapAlign: "start" },
        }}
      >
        {loading && (
          <Typography sx={{ color: "#7A8194" }}>Loading top doctors...</Typography>
        )}

        {!loading &&
          doctors.map((doc) => (
            <Box key={doc.id} sx={{ minWidth: { xs: 280, sm: 320 } }}>
              <DoctorCard
                doctor={doc as any}
                onFavoriteToggle={() => {
                  // optional
                }}
              />
            </Box>
          ))}

        {!loading && doctors.length === 0 && (
          <Typography sx={{ color: "#7A8194" }}>No doctors available.</Typography>
        )}
      </Box>

      {/* Your existing review text block (unchanged) */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography sx={{ fontSize: { xs: "24px", sm: "40px" } }}>
            Reviews
          </Typography>
          <Typography sx={{ fontSize: { xs: "24px", sm: "40px" } }}>
            That Speak for Themselves
          </Typography>
        </Box>

        <Box display="flex" py={4} gap="2px">
          {Array.from({ length: 5 }).map((_, index) => (
            <Box
              component="img"
              src={homeReviewStar}
              key={index}
              sx={{ width: 32, height: 32 }}
            />
          ))}
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            maxWidth: "368px",
            fontSize: "20px",
            color: "#555B6C",
            fontFamily: "Montserrat",
          }}
        >
          “Quick and easy booking! I found a great dermatologist near me and booked an appointment in just a few minutes.”
        </Typography>
      </Box>
    </Box>
  );
}
