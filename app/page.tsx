import AboutPage from "@/features/landing/AboutUs";
import HeroSection from "@/features/landing/HeroComponents";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPage />
    </>
  );
}
