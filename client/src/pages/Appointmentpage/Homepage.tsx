import HowItWorksSection from "@/Components/homePageComponents/HowitworksSection";
import Hero from "../../Components/homePageComponents/Hero";
import HomeMapSection from "@/Components/homePageComponents/HomeMapSection";
import ReviewSection from "@/Components/homePageComponents/ReviewSection"
import FAQSection from "@/Components/homePageComponents/FAQSection";
import { Container, Stack } from "@mui/material";

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={8} alignItems="stretch">
        <Hero />
        <HowItWorksSection />
        <HomeMapSection />
        <ReviewSection />
        <FAQSection />
      </Stack>
    </Container>
  );
}
export default HomePage;