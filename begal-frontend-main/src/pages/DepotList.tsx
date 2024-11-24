import { useEffect, useState } from "react";
import "../styles/globals.css";
import heroIcon from "@/assets/hero-icon.png";
import ellipse from "@/assets/ellipse.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CardDepot from "@/components/CardDepot";
import instance from "@/lib/axios";
import depotType from "@/types/depotType";
import heroSlider1 from "@/assets/heroslider1.png";
import heroSlider2 from "@/assets/heroslider2.png";
import heroSlider3 from "@/assets/heroslider3.png";

function DepotList() {
  const carouselItems = [
    {
      id: 1,
      image: heroSlider1,
    },
    {
      id: 2,
      image: heroSlider2,
    },
    {
      id: 3,
      image: heroSlider3,
    },
  ];
  const [depotList, setDepotList] = useState<depotType[]>([]);
  const token: string | null = localStorage.getItem("authToken");

  const getDepotList = async () => {
    try {
      const response = await instance.get("sellers/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDepotList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching depot list:", error);
    }
  };

  useEffect(() => {
    getDepotList();
  }, []);

  return (
    <main>
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

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 px-24 py-10 dark:bg-gray-900">
        {depotList.map((depot) => (
          <CardDepot
            key={depot.id}
            id={depot.id}
            profile_picture_url={depot.profile_picture_url}
            name={depot.name}
            address={depot.address}
            rating={depot.rating}
          />
        ))}
      </div>
    </main>
  );
}

export default DepotList;
