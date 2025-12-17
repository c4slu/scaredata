import { BenefitsSection } from "@/components/BenefitsSection";
import CardFeature from "@/components/cardsfeature";
import { Footer } from "@/components/footer";
import HomeSection from "@/components/home";
import { HowItWorksSection } from "@/components/howitworkssection";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--bg-gradient-start),var(--bg-gradient-end))]">
      <div className="flex flex-col h-[90vh]">
        <Navbar />
        <HomeSection />
      </div>
      <CardFeature />
      <HowItWorksSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
}
