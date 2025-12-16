import { CardContent, Typography, Card, Divider, Box } from "@mui/material";

export interface HowItWorksCardsProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

function HowItWorksCards({
  title,
  description,
  children,
}: HowItWorksCardsProps) {
  return (
    <Card sx={{ width: "346px", borderRadius: " 30px" }}>
      <Box
        maxHeight={"186px"}
        minHeight={"186px"}
        sx={{
          overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {children}
      </Box>

      <Divider />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HowItWorksCards;
