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
import { depotType } from "@/types/depotType";
import heroSlider1 from "@/assets/banner1.png";
import heroSlider2 from "@/assets/banner2.png";
import heroSlider3 from "@/assets/banner3.png";
import { Skeleton } from "@/components/ui/skeleton";

function DepotList() {
  const carouselItems = [
    { id: 1, image: heroSlider1 },
    { id: 2, image: heroSlider2 },
    { id: 3, image: heroSlider3 },
  ];
  const [depotList, setDepotList] = useState<depotType[]>([]);
  const token: string | null = sessionStorage.getItem("authToken");

  const getDepotList = async () => {
    try {
      const response = await instance.get("sellers/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepotList(response.data.data);
    } catch (error) {
      console.error("Error fetching depot list:", error);
    }
  };

  useEffect(() => {
    getDepotList();
  }, []);

  return (
    <main className="dark:bg-gray-900">
      <div className="py-5 sm:py-10">
        {depotList.length > 0 ? (
          <Carousel
            className="w-full p-10 mt-16 sm:mt-20 lg:mt-28"
            plugins={[
              //@ts-expect-error outside comps
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
                  <img
                    src={item.image}
                    alt="depotHeroImages"
                    className="w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16 sm:mt-20 lg:mt-28">
            <Skeleton className="h-48 w-full sm:h-64 sm:w-[300px] md:h-80 lg:h-96" />
            <Skeleton className="h-48 w-full sm:h-64 sm:w-[300px] md:h-80 lg:h-96" />
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow-lg w-full sm:w-5/6 md:w-3/4 lg:w-2/3 h-auto sm:h-24 mx-auto mt-10 sm:mt-20 flex flex-col sm:flex-row justify-around items-center p-4 sm:p-0">
          <div className="hidden sm:block absolute left-4 sm:left-10 lg:left-44 -z-10">
            <img src={ellipse} alt="" className="w-16 sm:w-24 lg:w-auto" />
          </div>
          <div className="hidden sm:block absolute right-4 sm:right-10 lg:right-44 bottom-56 -z-10">
            <img src={ellipse} alt="" className="w-16 sm:w-24 lg:w-auto" />
          </div>
          <div className="text-center sm:text-left mb-2 sm:mb-0">
            <p className="font-bold text-black dark:text-white">Begal</p>
            <p className="font-bold text-black dark:text-white">
              <span className="text-blue-600">Gallon </span>
              Delivery
            </p>
          </div>
          <div className="text-center sm:text-left mb-2 sm:mb-0">
            <p className="font-semibold text-black dark:text-white">
              Pesan Galon Sekarang Menjadi Lebih Mudah
            </p>
          </div>
          <div className="hidden sm:block">
            <img src={heroIcon} alt="" className="-mb-20" width="150px" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-6 sm:py-8 lg:py-10">
        {depotList.map((depot) => (
          <CardDepot
            key={depot.id}
            id={depot.id}
            profile_picture_url={depot.profile_picture_url}
            name={depot.name}
            address={depot.address}
            rating={depot.rating}
            className={""}
            owner_name={""}
            email={""}
            phone={""}
            role={""}
            operational_hours={{
              open: "",
              close: "",
            }}
            reviews_count={""}
            created_at={""}
            updated_at={""}
            products={undefined}
          />
        ))}
      </div>
    </main>
  );
}

export default DepotList;
