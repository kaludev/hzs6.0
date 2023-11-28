"use client"

import HeroSection from "@components/Hero/Hero"
import AboutSection from "@components/About/About"
import SponsorsSection from "@components/Sponsors/Sponsors"
import ContactSection from "@components/Contact/Contact"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SponsorsSection />
      <ContactSection />
    </>
  )
}
