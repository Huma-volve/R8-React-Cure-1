import { Box, Typography } from "@mui/material";
import HowItWorksCards from "../Cards/HowItWorksCards";
import RotatingSearchBar from "./RotatingSearchBar";
import Stars from "../../assets/images/HowItWorksStars.svg";
import HowItWorksCalendar from "../../assets/images/HowItWorksCalendar.svg";
import HowItWorksSteps from "../../assets/images/HowItWorksSteps.svg";
import { useState, useEffect } from "react";

const steps = [
  {
    title: "Search for a Doctor",
    description:
      "Easily browse by specialty, location, or doctor name to find the right healthcare provider for your needs.",
    content: (
      <>
        {" "}
        <img src={Stars} alt="" />
        <RotatingSearchBar />
        <img src={Stars} alt="" />
      </>
    ),
  },
  {
    title: "Choose a Date & Time",
    description:
      "View real-time availability and pick a slot that works best for your schedule.",
    content: <img src={HowItWorksCalendar} alt="" />,
  },
  {
    title: "Book & Pay Online",
    description:
      "Confirm your appointment and pay securely using various payment options—credit card, mobile wallet.",
    content: <img src={HowItWorksSteps} alt="" />,
  },
];

function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 3000); // 3s

    return () => window.clearInterval(id);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width:"100%"
      }}
    >
      <Typography variant="h4">How it works</Typography>
      {/* Desktop Design */}
      <Box sx={{ display: { xs: "none", md: "flex" },  justifyContent:"space-between",gap: 4, mt: 4 }}>
        {steps.map((step, index) => (
          <HowItWorksCards
            title={step.title}
            description={step.description}
            key={index}
          >
            {step.content}
          </HowItWorksCards>
        ))}
      </Box>
      {/* Responseive Design */}
      <Box sx={{ display: { xs: "block", md: "none" }, mt: 4 }}>
        <HowItWorksCards
          title={steps[activeIndex].title}
          description={steps[activeIndex].description}
        >
          {steps[activeIndex].content}
        </HowItWorksCards>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {steps.map((_, idx) => (
            <Box
              key={idx}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: idx === activeIndex ? "#145DB8" : "#99A2AB",
                opacity: idx === activeIndex ? 1 : 0.4,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default HowItWorksSection;
