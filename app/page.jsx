
import HeroSection from "@components/Hero/Hero"
import AboutSection from "@components/About/About"
import SponsorsSection from "@components/Sponsors/Sponsors"
import ContactSection from "@components/Contact/Contact"
import PricingCards from "@components/PricingCards/PricingCards"
import Chat from "@components/Chat/Chat"
import Map from "@components/Map/Map"

export default function Home() {
  return (
    <>
      <Chat />
      <HeroSection />
      <AboutSection />
      <SponsorsSection />
      <PricingCards />
      <ContactSection mode="all" />
    </>
  )
}
