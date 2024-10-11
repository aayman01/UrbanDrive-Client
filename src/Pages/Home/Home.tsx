import Banner from "../../Components/Banner";
import BookAutoRental from "../../Components/BookAutoRental";
import CarRental from "../../Components/CarRental";
import BrowseByCar from "../../Components/BrowseByCar";
import BrowseByDestination from "../../Components/BrowseByDestination";
import Reviews from "../../Components/Reviews";
import FaqSection from "../../Components/FaqSection";
import Membership from "../../Components/Membership/Membership";
import SslPayment from "../../Components/PaymentSystem/SSLCommarze/SslPayment";


const Home: React.FC = () => {
  return (
    <div className="">
      <Banner></Banner>
      <CarRental></CarRental>
      <BookAutoRental></BookAutoRental>
      <BrowseByDestination />
      <BrowseByCar></BrowseByCar>
      <Membership></Membership>
      <Reviews></Reviews>
      <FaqSection />
    	<SslPayment/>
    </div>
  );
}
export default Home;