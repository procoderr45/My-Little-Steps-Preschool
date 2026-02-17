import Navbar from "@/features/app/Navbar";
import AboutPage from "@/features/landing/AboutUs";
import HeroSection from "@/features/landing/HeroComponents";
import Image from "next/image";

export const metadata = {
  title: "Best Preschool in Mumbai | My Little Steps Preschool, Ambarnath",
  description:
    "Discover our philosophy, core values, and nurturing approach at My Little Steps Preschool in Ambarnath.",
  keywords: [
    "Best preschool in Ambarnath",
    "Luxury preschool Mumbai",
    "Montessori preschool Ambarnath",
    "CBSE preschool near me"
  ],

  verification: {
    google: "4AvwA2rd-SSD7gUUN5Hqq3n7X9e1IjPPh0FWxCysGz4",
  },
}


export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPage />
    </>
  );
}
