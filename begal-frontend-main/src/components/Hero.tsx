import heroImg from "@/assets/hero-slider.png";
import heroIcon from "@/assets/hero-icon.png";
import featureSlider from "@/assets/feature-slider.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
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
  ];

  const featureItems = [
    {
      id: 1,
      image: featureSlider,
    },
    {
      id: 2,
      image: featureSlider,
    },
    {
      id: 3,
      image: featureSlider,
    },
    {
      id: 4,
      image: featureSlider,
    },
    {
      id: 5,
      image: featureSlider,
    },
  ];
  return (
    <>
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

      <div className="flex justify-between gap-20 mt-20">
        <h3 className="text-3xl">
          Produk yang <br /> ditawarkan
        </h3>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-1/2"
        >
          <CarouselContent>
            {featureItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="flex items-center justify-center basis-1/3"
              >
                <img src={item.image} alt="" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex flex-col  gap-20 mt-20">
        <div className="flex justify-between">
          <h3 className="text-3xl">Daftar Depot</h3>

          <div className="text-xl">lihat semua depot</div>
        </div>

        <div className="flex justify-around gap-20">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-1/2"
          >
            <CarouselNext />
            <CarouselPrevious />
            <CarouselContent>
              {featureItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="flex items-center justify-center basis-1/3"
                >
                  <img src={item.image} alt="" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
}
