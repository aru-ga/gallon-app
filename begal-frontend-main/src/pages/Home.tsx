import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/globals.css";
import { carouselItems, featureItems, depotListData } from "@/lib/DummyData";
import heroIcon from "@/assets/hero-icon.png";
import CardDepot from "@/components/CardDepot";
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
  return (
    <>
      <Navbar activePath={location.pathname} />
      <main className="px-20 mt-24 dark:bg-gray-900 dark:text-white">
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

          <div className="bg-white shadow-lg w-2/3 h-24 mx-auto mt-20 flex justify-around items-center dark:bg-gray-800 dark:shadow-2xl">
            <div className="absolute left-44 -z-10">
              <img src={ellipse} alt="" />
            </div>
            <div className="absolute right-44 bottom-56 -z-10">
              <img src={ellipse} alt="" />
            </div>
            <div>
              <p className="font-bold dark:text-white">Begal</p>
              <p className="ml-10 font-bold dark:text-white">
                <span className="text-blue-600">Gallon </span>
                Delivery
              </p>
            </div>
            <div>
              <p className="font-semibold dark:text-white">
                Pesan Galon Sekarang Menjadi Lebih Mudah
              </p>
            </div>
            <div>
              <img src={heroIcon} alt="" className="-mb-20" width="150px" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-20 mt-20 dark:text-white">
          <h3 className="text-2xl flex items-center justify-center -mr-40 rounded-lg -z-10 p-24 w-1/2 bg-blue-600 text-white dark:bg-blue-800 dark:text-gray-300">
            Produk yang <br /> ditawarkan
          </h3>

          <Carousel
            orientation="horizontal"
            opts={{
              align: "start",
            }}
            className="z-10"
          >
            <CarouselPrevious
              variant="ghost"
              className="p-9 text-white bg-black dark:bg-gray-700  right-80 -top-14 translate-x-96 left-40"
            />
            <CarouselNext
              variant="ghost"
              className="p-9 text-white bg-black dark:bg-gray-700 -top-14 right-0"
            />
            <CarouselContent>
              {featureItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="flex items-center flex-shrink justify-center basis-1/5"
                >
                  <img src={item.image} alt="" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex flex-col  gap-20 mt-20 mb-52">
          <div className="flex justify-between dark:text-white">
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
              className="p-10 text-white bg-black dark:bg-gray-700  -top-14 translate-x-96 left-96"
            />
            <CarouselNext className="p-10 text-white bg-black text-9xl dark:bg-gray-700 -top-14 right-0" />
            <CarouselContent>
              {depotListData.map((depot) => (
                <CarouselItem key={depot.id} className="basis-1/3">
                  <CardDepot
                    id={depot.id}
                    imageUrl={depot.imageUrl}
                    name={depot.name}
                    location={depot.address.province}
                    ratings={depot.ratings}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex flex-col gap-20 mt-20 mb-52">
          <div className="bg-blue-600 h-80 w-full flex flex-col p-20 justify-between dark:bg-gray-800">
            <h3 className="text-4xl text-white dark:text-gray-200">
              Lorem ipsum dolor sit amet, consectetur.
            </h3>
            <div className="flex justify-between">
              <div className="flex flex-row items-center">
                <p className="text-white p-2 bg-black dark:bg-gray-700">icon</p>
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-white p-2 bg-black dark:bg-gray-700">icon</p>
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-white p-2 bg-black dark:bg-gray-700">icon</p>
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="flex flex-row items-center">
                <Button className="w-56 rounded">Order Now</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  gap-20 pt-20 pb-52">
          <div className="flex justify-between dark:text-white">
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
              className="p-10 text-white bg-black dark:bg-gray-700  -top-14 translate-x-96 left-96"
            />
            <CarouselNext className="p-10 text-white bg-black text-9xl dark:bg-gray-700 -top-14 right-0" />
            <CarouselContent>
              {depotListData.map((depot) => (
                <CarouselItem key={depot.id} className="basis-1/3">
                  <CardDepot
                    id={depot.id}
                    imageUrl={depot.imageUrl}
                    name={depot.name}
                    location={depot.address.province}
                    ratings={depot.ratings}
                  />
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
