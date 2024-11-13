import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/globals.css";
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
import { carouselItems, depotListData } from "@/lib/DummyData";

function DepotList() {
  const location = useLocation();

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode) {
      if (savedMode === "enabled") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const systemPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemPreference) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  return (
    <>
      <Navbar activePath={location.pathname} />

      <div className="py-10 dark:bg-gray-900">
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

        <div className="bg-white dark:bg-gray-800 shadow-lg w-2/3 h-24 mx-auto mt-20 flex justify-around items-center">
          <div className="absolute left-44 -z-10">
            <img src={ellipse} alt="" />
          </div>
          <div className="absolute right-44 bottom-56 -z-10">
            <img src={ellipse} alt="" />
          </div>
          <div>
            <p className="font-bold text-black dark:text-white">Begal</p>
            <p className="ml-10 font-bold text-black dark:text-white">
              <span className="text-blue-600">Gallon </span>
              Delivery
            </p>
          </div>
          <div>
            <p className="font-semibold text-black dark:text-white">
              Pesan Galon Sekarang Menjadi Lebih Mudah
            </p>
          </div>
          <div>
            <img src={heroIcon} alt="" className="-mb-20" width="150px" />
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 px-24 py-10 dark:bg-gray-900">
        {depotListData.map((depot) => (
          <CardDepot
            key={depot.id}
            id={depot.id}
            imageUrl={depot.imageUrl}
            name={depot.name}
            location={depot.address.province}
            ratings={depot.ratings}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default DepotList;
