import { BecomeChefCta } from "@/components/shared/become-chef-cta";
import { FeaturedChefs } from "@/components/shared/featured-chefs";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/shared/hero";
import { HowItWorks } from "@/components/shared/how-it-works";
import { Navbar } from "@/components/shared/navbar";
import SubscriptionPlane from "@/components/shared/subscription-plan";


export default function LandingPage() {
  return (
    <main className="bg-[#F6EFE4] text-[#2A1E16]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedChefs />
      <SubscriptionPlane/>
      <BecomeChefCta />
      <Footer />
    </main>
  );
}
