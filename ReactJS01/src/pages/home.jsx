import HeroWithSearch from '../components/home/HeroWithSearch';
import FeaturedCars from '../components/home/FeaturedCars';
import CategoryBrandSection from '../components/home/CategoryBrandSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ReviewsSection from '../components/home/ReviewsSection';
import ContactCTA from '../components/home/ContactCTA';

const HomePage = () => {
  return (
    <main className="luxury-page">
      <HeroWithSearch />
      <FeaturedCars />
      <CategoryBrandSection />
      <WhyChooseUs />
      <ReviewsSection />
      <ContactCTA />
    </main>
  );
};

export default HomePage;
