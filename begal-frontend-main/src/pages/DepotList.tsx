import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/globals.css";
import heroImg from "@/assets/hero-slider.png";
import heroIcon from "@/assets/hero-icon.png";
import ellipse from "@/assets/ellipse.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLocation } from "react-router-dom";
import CardDepot from "@/components/CardDepot";
import dummyImg from "@/assets/feature-slider.png";

function DepotList() {
  const location = useLocation();
  const depotData = [
    {
      id: "1",
      imageUrl: dummyImg,
      name: "Depot A",
      location: "Location A",
      ratings: 4.5,
    },
    {
      id: "2",
      imageUrl: dummyImg,
      name: "Depot B",
      location: "Location B",
      ratings: 4.0,
    },
    {
      id: "3",
      imageUrl: dummyImg,
      name: "Depot C",
      location: "Location C",
      ratings: 3.8,
    },
    {
      id: "4",
      imageUrl: dummyImg,
      name: "Depot D",
      location: "Location D",
      ratings: 4.2,
    },
    {
      id: "5",
      imageUrl: dummyImg,
      name: "Depot E",
      location: "Location E",
      ratings: 4.7,
    },
  ];
  const carouselItems = [
    {
      id: 1,
      image: heroImg,
    },
    {
      id: 2,
      image: heroImg,
    },
    {
      id: 3,
      image: heroImg,
    },
    {
      id: 4,
      image: heroImg,
    },
    {
      id: 5,
      image: heroImg,
    },
  ];
  return (
    <>
      <Navbar activePath={location.pathname} />
      <div className="my-10">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {carouselItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="flex items-center justify-center"
              >
                <img src={item.image} alt="" className="w-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="bg-white shadow-lg w-2/3 h-24 mx-auto mt-20 flex justify-around items-center">
          <div className="absolute left-44 -z-10">
            <img src={ellipse} alt="" />
          </div>
          <div className="absolute right-44 bottom-56 -z-10">
            <img src={ellipse} alt="" />
          </div>
          <div>
            <p className="font-bold">Begal</p>
            <p className="ml-10 font-bold">
              <span className="text-blue-600">Gallon </span>
              Delivery
            </p>
          </div>
          <div>
            <p className="font-semibold">
              Pesan Galon Sekarang Menjadi Lebih Mudah
            </p>
          </div>
          <div>
            <img src={heroIcon} alt="" className="-mb-20" width="150px" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 mx-24 my-10">
        {depotData.map((depot) => (
          <CardDepot
            key={depot.id}
            id={depot.id}
            imageUrl={depot.imageUrl}
            name={depot.name}
            location={depot.location}
            ratings={depot.ratings}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default DepotList;
