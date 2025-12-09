import { Box, Container, Grid, IconButton, Link, Typography } from "@mui/material";

function DesktopFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#021431",
        color: "white",
        pt: 6,
        pb: 3,
        mt: "auto",   
        width: "100%",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        className="container"
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Cure
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.7)">
              Cure helps you find trusted doctors, book appointments, and manage your health.
            </Typography>

            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <IconButton size="small" sx={{ color: "white" }}>{/* social icon */}</IconButton>
              <IconButton size="small" sx={{ color: "white" }}>{/* social icon */}</IconButton>
            </Box>
          </Grid>

          {/* Company */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Company
            </Typography>
            <Link href="#" color="inherit" underline="none" display="block" variant="body2">
              Home
            </Link>
            <Link href="#" color="inherit" underline="none" display="block" variant="body2">
              Doctors
            </Link>
            <Link href="#" color="inherit" underline="none" display="block" variant="body2">
              FAQs
            </Link>
          </Grid>

          {/* Support */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Support
            </Typography>
            <Link href="#" color="inherit" underline="none" display="block" variant="body2">
              Help Center
            </Link>
            <Link href="#" color="inherit" underline="none" display="block" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="none" display="block" variant="body2">
              Terms &amp; Conditions
            </Link>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Contact Info
            </Typography>
            <Typography variant="body2">Email: support@cure.com</Typography>
            <Typography variant="body2">Phone: +1 234 567 890</Typography>
            <Typography variant="body2">Address: 129 El-Nasr Street, Cairo</Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 1,
          }}
        >
          <Typography variant="body2">
            2025 Cure. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="#" color="inherit" underline="none" variant="caption">
              Terms &amp; Conditions
            </Link>
            <Link href="#" color="inherit" underline="none" variant="caption">
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default DesktopFooter;
