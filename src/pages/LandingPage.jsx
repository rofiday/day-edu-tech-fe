import CourseSection from "@/components/landing-page/CourseSection";
import ContentSection from "@/components/landing-page/ContentSection";
import FaqSection from "@/components/landing-page/FaqSection";
import FooterSection from "@/components/landing-page/FooterSection";
import HeroSection from "@/components/landing-page/HeroSection";
import HiringPartners from "@/components/landing-page/HiringPartners";
import MarqueeSection from "@/components/MarqueeSection";
import ProgramSection from "@/components/landing-page/ProgramSection";
import TestimonialSection from "@/components/landing-page/TestimonialSection";
import WhatappIcon from "@/components/WhatappIcon";
const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <CourseSection />
      <HiringPartners />
      <ContentSection />
      <ProgramSection />
      <TestimonialSection />
      <FaqSection />
      <FooterSection />
      <WhatappIcon />
    </>
  );
};

export default LandingPage;
