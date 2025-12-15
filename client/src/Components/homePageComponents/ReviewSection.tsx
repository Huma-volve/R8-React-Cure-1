import { Box, Typography } from "@mui/material";
import homeReviewStar from "@/assets/images/homeReviewStar.svg"

function ReviewSection() {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography sx={{ fontSize: { xs: "24px", sm: "40px" } }}>
          Reviews
        </Typography>
        <Typography sx={{ fontSize: { xs: "24px", sm: "40px" } }}>
          That Speak for Themselves
        </Typography>
      </Box>
      <Box display={"flex"} py={4} gap={"2px"}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Box component={"img"} src={homeReviewStar} key={index} sx={{ width: 32, height: 32 }}/>
        ))}
      </Box>
      <Typography sx={{textAlign:"center", maxWidth:"368px", fontSize:"20px", color:"#555B6C", fontFamily:"Montserrat"}}>
        “Quick and easy booking! I found a great dermatologist near me and booked an appointment in just a few minutes.”
      </Typography>
    </Box>
  );
}

export default ReviewSection;
