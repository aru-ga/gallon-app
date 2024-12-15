import "../styles/globals.css";
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
import { Link } from "react-router-dom";
import instance from "@/lib/axios";
import { useEffect, useState } from "react";
import { depotType } from "@/types/depotType";
import { productType } from "@/types/productType";
import CardProduct from "@/components/CardProduct";
import heroSlider1 from "@/assets/heroslider1.png";
import heroSlider2 from "@/assets/heroslider2.png";
import heroSlider3 from "@/assets/heroslider3.png";
import { Skeleton } from "@/components/ui/skeleton";
import homeImg from "@/assets/homeImg.jpg";

function Home() {
  const [nearbyDepotList, setNearbyDepotList] = useState<depotType[]>([]);
  const [depotListData, setDepotListData] = useState<depotType[]>([]);
  const [products, setProducts] = useState<productType[]>([]);
  const token: string | null = sessionStorage.getItem("authToken");

  const carouselItems = [
    { id: 1, image: heroSlider1 },
    { id: 2, image: heroSlider2 },
    { id: 3, image: heroSlider3 },
  ];

  const getProducts = async () => {
    try {
      const response = await instance.get("products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getNearbyDepot = async () => {
    if (token) {
      try {
        const response = await instance.get("sellers/nearby", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNearbyDepotList(response.data.data);
      } catch (error) {
        console.error("Error fetching nearby depot list:", error);
      }
    }
  };

  const getDepotList = async () => {
    try {
      const response = await instance.get("sellers/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepotListData(response.data.data);
    } catch (error) {
      console.error("Error fetching depot list:", error);
    }
  };

  useEffect(() => {
    getNearbyDepot();
    getProducts();
    getDepotList();
  }, []);

  return (
    <main className="px-4 sm:px-6 lg:px-20 mt-20 sm:mt-28 dark:bg-gray-900 dark:text-white">
      <div className="my-5 sm:my-10">
        <Carousel
          className="w-full"
          plugins={[
            //@ts-expect-error - EmblaCarouselAutoplay is not a known type
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
                  alt="carousel-images"
                  className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="bg-white shadow-lg w-full sm:w-5/6 lg:w-2/3 h-auto sm:h-24 mx-auto mt-10 sm:mt-20 flex flex-col sm:flex-row justify-around items-center p-4 sm:p-0 dark:bg-gray-800 dark:shadow-2xl">
          <div className="hidden sm:block absolute left-10 lg:left-44 -z-10">
            <img src={ellipse} alt="" className="w-24 lg:w-auto" />
          </div>
          <div className="hidden sm:block absolute right-10 lg:right-44 bottom-56 -z-10">
            <img src={ellipse} alt="" className="w-24 lg:w-auto" />
          </div>
          <div className="text-center sm:text-left mb-2 sm:mb-0">
            <p className="font-bold dark:text-white">Begal</p>
            <p className="font-bold dark:text-white">
              <span className="text-blue-600">Gallon </span>
              Delivery
            </p>
          </div>
          <div className="text-center sm:text-left mb-2 sm:mb-0">
            <p className="font-semibold dark:text-white">
              Pesan Galon Sekarang Menjadi Lebih Mudah
            </p>
          </div>
          <div className="hidden sm:block">
            <img src={heroIcon} alt="" className="-mb-20" width="150px" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-20 mt-10 lg:mt-20 dark:text-white">
        <img
          src={homeImg}
          className="text-2xl flex items-center justify-center -mr-40 rounded-lg w-full hidden lg:block lg:w-1/2 lg:h-[400px] object-cover"
        />

        {products && products.length > 0 ? (
          <Carousel className="z-20 flex-1 w-full lg:min-w-[75%] lg:max-w-screen-md">
            <CarouselContent className="flex flex-row gap-4 lg:gap-10">
              {products.map((product) => (
                <CardProduct
                  id={product.id}
                  key={product.id}
                  image_url={product.image_url}
                  name={product.name}
                  price={product.price}
                  className=""
                  seller_id={""}
                  description={"string"}
                  stock={0}
                  created_at={"string"}
                  updated_at={""}
                  quantity={0}
                  seller_name={undefined}
                  product_id={""}
                  image={""}
                />
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        ) : (
          <Carousel className="z-20 flex-1 w-full lg:min-w-[75%] lg:max-w-screen-md">
            <CarouselContent className="flex flex-row gap-4 lg:gap-10">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-52 w-[200px]" />
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

      <div className="flex flex-col gap-10 lg:gap-20 mt-10 lg:mt-20 mb-20 lg:mb-52">
        <div className="flex justify-between dark:text-white">
          <h3 className="text-2xl lg:text-3xl">Daftar Depot</h3>
          <Link to="/depot-list">
            <div className="text-lg lg:text-xl">lihat semua depot</div>
          </Link>
        </div>

        {depotListData.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mt-5 mx-auto justify-center"
          >
            <CarouselContent>
              {depotListData.map((depot) => (
                <CarouselItem
                  key={depot.id}
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <CardDepot
                    id={depot.id}
                    key={depot.id}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        ) : (
          <Carousel className="z-20 flex-1 w-full lg:min-w-[75%] lg:max-w-screen-md">
            <CarouselContent className="flex flex-row gap-4 lg:gap-10">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-96 w-[300px]" />
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

      <div className="flex flex-col gap-10 lg:gap-20 mt-10 lg:mt-20 mb-20 lg:mb-52">
        <div className="flex justify-between dark:text-white">
          <h3 className="text-2xl lg:text-3xl">Depot Terdekat</h3>
          <Link to="/depot-list">
            <div className="text-lg lg:text-xl">lihat semua depot</div>
          </Link>
        </div>

        {token ? (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mt-5 mx-auto justify-center"
          >
            <CarouselContent>
              {nearbyDepotList.map((depot) => (
                <CarouselItem
                  key={depot.id}
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <CardDepot
                    id={depot.id}
                    key={depot.id}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        ) : (
          <div className="flex justify-center items-center h-48 lg:h-96">
            <p className="text-xl lg:text-2xl">
              <Link to="/login-user" className="underline">
                Login
              </Link>{" "}
              untuk melihat depot terdekat
            </p>
          </div>
        )}
      </div>

      <section className="relative min-h-[300px] lg:min-h-[400px] w-full bg-white dark:bg-gray-950 rounded-lg pb-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 py-10 lg:py-16 text-center">
          <h2 className="mb-2 text-2xl lg:text-3xl font-bold sm:text-4xl md:text-5xl">
            Pesan Galon
          </h2>
          <h3 className="mb-4 lg:mb-6 text-lg lg:text-xl font-semibold sm:text-2xl md:text-3xl">
            Lebih Mudah dengan Kami
          </h3>
          <p className="mx-auto max-w-2xl text-sm lg:text-base sm:text-lg">
            Nikmati kemudahan dalam memenuhi kebutuhan air harian Anda dengan
            layanan antar galon air kami yang cepat dan praktis
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 320"
            className="w-full"
            preserveAspectRatio="none"
            height="160"
          >
            <path
              fill="#E1F5FE"
              fillOpacity="1"
              d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,170.7C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <path
              fill="#81D4FA"
              fillOpacity="0.8"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <path
              fill="#03A9F4"
              fillOpacity="1"
              d="M0,256L48,261.3C96,267,192,277,288,277.3C384,277,480,267,576,245.3C672,224,768,192,864,181.3C960,171,1056,181,1152,192C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
    </main>
  );
}

export default Home;
