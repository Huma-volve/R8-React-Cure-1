import { Box, Typography, Stack } from "@mui/material";
import BsHeartPulse from "@/assets/NavBarIcons/BsHeartPulse.svg";
import Phonecall from "@/assets/FooterIcons/Phonecall.svg";
import {  Linkedin, Facebook, Twitter, Instagram} from "lucide-react";

function MobileFooter() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#05162C", width: "100%", color: "white" }}
    >
      <Box sx={{ px: "50px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: "30px",
            mb: 2,
            gap: 1,
          }}
        >
          <img src={BsHeartPulse} alt="Heart Pulse" />
          <Typography variant="h6">Cure</Typography>
        </Box>
        <Box sx={{ alignContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography variant="body1">Lets Discuss</Typography>
            <img
              src={Phonecall}
              alt="Phone Call"
              style={{ marginLeft: "8px" }}
            />
          </Box>
          <Typography
            variant="body1"
            textAlign={"center"}
            sx={{ mb: 4 }}
          >
            Cure helps you find trusted doctors, book appointments, and manage
            your health—quickly and easily.
          </Typography>
        </Box>
      </Box>
      <Box sx={{display:"flex", justifyContent:"center", }}>
            <Box sx={{borderTop:1, width:"343px", display:"flex", justifyContent:"space-between", mt:2,}}>
        <Typography
          variant="body2"
          color="rgba(255,255,255,0.7)"
          textAlign="center"
          sx={{ py: 2 }}
        >
          ©  Cure. All rights reserved.
        </Typography>
        <Stack sx={{py:1.5} } direction="row" spacing={1}>
            <Facebook width={14}/>
            <Twitter width={14}/>
            <Instagram width={14}/>
            <Linkedin width={14}/>
        </Stack>
            </Box>
      </Box>
    </Box>
  );
}

export default MobileFooter;
