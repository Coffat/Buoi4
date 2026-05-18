import HeroWithSearch from '../components/home/HeroWithSearch';
import MemberVipBanner from '../components/home/MemberVipBanner';
import {
  PromotionsSection,
  NewArrivalsSection,
  FeaturedSection,
} from '../components/home/ProductShowcaseSection';
import CategoryBrandSection from '../components/home/CategoryBrandSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ReviewsSection from '../components/home/ReviewsSection';
import ContactCTA from '../components/home/ContactCTA';

const HomePage = () => {
  return (
    <main className="luxury-page">
      <HeroWithSearch />
      <MemberVipBanner />
      <PromotionsSection />
      <NewArrivalsSection />
      <FeaturedSection />
      <CategoryBrandSection />
      <WhyChooseUs />
      <ReviewsSection />
      <ContactCTA />
    </main>
  );
};

export default HomePage;
