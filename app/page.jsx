
import HeroSection from "@components/Hero/Hero"
import AboutSection from "@components/About/About"
import SponsorsSection from "@components/Sponsors/Sponsors"
import ContactSection from "@components/Contact/Contact"
import PricingCards from "@components/PricingCards/PricingCards"
import Map from "@components/Map/Map"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SponsorsSection />
      <PricingCards />
      <ContactSection mode="all" />
    </>
  )
}
