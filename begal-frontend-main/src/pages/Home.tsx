import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/globals.css";
import heroImg from "@/assets/hero-slider.png";
import heroIcon from "@/assets/hero-icon.png";
import featureSlider from "@/assets/feature-slider.png";
import ellipse from "@/assets/ellipse.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const location = useLocation();
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
      <Navbar activePath={location.pathname} />
      <main className="mx-20 mt-24">
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

        <div className="flex justify-between gap-20 mt-20">
          <h3 className="text-3xl">
            Produk yang <br /> ditawarkan
          </h3>

          <Carousel 
          orientation="horizontal"
            opts={{
              align: "start",
            }}
            className="w-1/2"
          >
            <CarouselPrevious
              variant="ghost"
              className="p-9 text-white bg-black  right-80 -top-14 translate-x-96 left-40"
            />
            <CarouselNext
              variant="ghost"
              className="p-9 text-white bg-black  -top-14 right-0"
            />
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

        <div className="flex flex-col  gap-20 mt-20 mb-52">
          <div className="flex justify-between">
            <h3 className="text-3xl">Daftar Depot</h3>
            <Link to="/depot-list">
              <div className="text-xl">lihat semua depot</div>
            </Link>
          </div>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mt-5 justify-between"
          >
            <CarouselPrevious
              variant="ghost"
              className="p-10 text-white bg-black  -top-14 translate-x-96 left-96"
            />
            <CarouselNext className="p-10 text-white bg-black text-9xl -top-14 right-0" />
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

        <div className="flex flex-col  gap-20 mt-20 mb-52">
          <div className="flex justify-between">
            <h3 className="text-3xl">Daftar Depot Terdekat</h3>
            <Link to="/depot-list">
              <div className="text-xl">lihat semua depot</div>
            </Link>
          </div>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mt-5 justify-between"
          >
            <CarouselPrevious
              variant="ghost"
              className="p-10 text-white bg-black  -top-14 translate-x-96 left-96"
            />
            <CarouselNext className="p-10 text-white bg-black text-9xl -top-14 right-0" />
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

        <div className="flex flex-col gap-20 mt-20 mb-52">
          <div className="bg-blue-600 h-80 w-full flex flex-col p-20 justify-between">
            <h3 className="text-4xl text-white">
              Lorem ipsum dolor sit amet, consectetur.
            </h3>
            <div className="flex justify-between">
              <div className="flex flex-row items-center">
                <p className="text-white p-2 bg-black">icon</p>
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-white p-2 bg-black">icon</p>
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-white p-2 bg-black">icon</p>
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="flex flex-row items-center">
                <Button className="w-56 rounded">Order Now</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  gap-20 mt-20 mb-52">
          <div className="flex justify-between">
            <h3 className="text-3xl">Depot dengan rating terbaik</h3>
            <Link to="/depot-list">
              <div className="text-xl">lihat semua depot</div>
            </Link>
          </div>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mt-5 justify-between"
          >
            <CarouselPrevious
              variant="ghost"
              className="p-10 text-white bg-black  -top-14 translate-x-96 left-96"
            />
            <CarouselNext className="p-10 text-white bg-black text-9xl -top-14 right-0" />
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
      </main>
      <Footer />
    </>
  );
}

export default Home;
