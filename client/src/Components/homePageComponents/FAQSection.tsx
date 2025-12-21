import { Box, Typography, Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FAQ = [
  {
    title: "What is this app used for?",
    description:
      "This app allows you to search for doctors, book appointments, and consult in person easily from your phone.",
  },
  {
    title: "Is the app free to use?",
    description:
      "Yes, the app is free to download and use. You only pay for your doctor appointments or consultations.",
  },
  {
    title: "How can I find a doctor?",
    description:
      "You can search by name, specialty, location, or filter doctors",
  },
  {
    title: "Can I cancel my appointment?",
    description:
      "Yes, go to ‘My Appointments,’ select the appointment, and choose Cancel. But if your appointment gets close, you can't get your money back.",
  },
  {
    title: "What payment are supported",
    description: "You can pay using credit/debit cards, mobile wallets",
  },
  {
    title: "How do I edit my profile?",
    description:
      "Go to your profile settings from the menu and update your name, contact info, or insurance details.",
  },
];

function FAQSection() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mx: 3,
        mt:"100px",
        gap: 3
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" , gap:1}}
      >
        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderRadius: "23px",
            borderColor: "white",
            bgcolor: "#E8EFF8",
            color: "#145DB8",
            width: "fit-content",
            px: 2,
            py: 1,
          }}
        >
          Frequently Asked Questions
        </Box>
        <Typography sx={{ fontSize: { xs: "20px" } }}>
          Got Questions ? We’ve got Answers!
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column",  width: "100%", maxWidth: 800, mx: "auto"  }}
      >
{FAQ.map((question, index) => (
    <Box key={index} sx={{ py: 1, }}>
      <Accordion sx={{ width: "100%", bgcolor:"#F5F6F7", boxShadow:"none",  }}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography component="span" sx={{fontSize: {xs:"20px", sm:"24px"}}}>{question.title}</Typography>
        </AccordionSummary>

        <Divider variant="middle" />

        <AccordionDetails>
          <Typography sx={{color:"#99A2AB"}}>{question.description}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  ))}
      </Box>
    </Box>
  );
}

export default FAQSection;
