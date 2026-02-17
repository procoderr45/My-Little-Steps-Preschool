import Navbar from "@/features/app/Navbar";
import AboutPage from "@/features/landing/AboutUs";
import HeroSection from "@/features/landing/HeroComponents";
import Image from "next/image";

export const metadata = {
  title: "About Us | My Little Steps Preschool, Ambarnath",
  description:
    "Discover our philosophy, core values, and nurturing approach at My Little Steps Preschool in Ambarnath.",
  keywords: [
    "Best preschool in Ambarnath",
    "Luxury preschool Mumbai",
    "Montessori preschool Ambarnath",
    "CBSE preschool near me"
  ],
}


export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPage />
    </>
  );
}
