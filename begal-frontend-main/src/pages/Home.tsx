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

function Home() {
  const [nearbyDepotList, setNearbyDepotList] = useState<depotType[]>([]);
  const [depotListData, setDepotListData] = useState<depotType[]>([]);
  const [products, setProducts] = useState<productType[]>([]);
  const token: string | null = sessionStorage.getItem("authToken");

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
    <main className="px-20 mt-28 dark:bg-gray-900  dark:text-white">
      <div className="my-10">
        <Carousel
          className="w-full"
          plugins={[
            //@ts-ignore
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
                  className="w=[1000px] h-[500px] object-cover"
                />
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
        <h3 className="text-2xl flex min-h-[300px] items-center justify-center -mr-40 rounded-lg z-10 p-24 w-1/2 bg-blue-600 dark:bg-red text-white dark:text-gray-100">
          Produk yang <br /> ditawarkan
        </h3>

        <Carousel className="z-20 flex-1 min-w-[75%] max-w-screen-md">
          <CarouselNext className="p-10 text-white bg-black text-9xl dark:bg-gray-700" />
          <CarouselPrevious className="p-10 text-white bg-black dark:bg-gray-700  " />
          <CarouselContent className="flex flex-row gap-10">
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
                updated_at={"string"}
                quantity={"string"}
                seller_name={undefined}
              />
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex flex-col gap-20 mt-20 mb-52">
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
          className="w-full pl-10 mt-5 justify-between"
        >
          <CarouselPrevious
            variant="ghost"
            className="p-10 text-white bg-black dark:bg-gray-700 -top-14 translate-x-96 left-96"
          />
          <CarouselNext className="p-10 text-white bg-black text-9xl dark:bg-gray-700 -top-14 right-0" />
          <CarouselContent>
            {depotListData.map((depot) => (
              <CarouselItem key={depot.id} className="basis-1/3">
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
        </Carousel>
      </div>

      <div className="flex flex-col  gap-20 mt-20 mb-52">
        <div className="flex justify-between dark:text-white">
          <h3 className="text-3xl">Depot Terdekat</h3>
          <Link to="/depot-list">
            <div className="text-xl">lihat semua depot</div>
          </Link>
        </div>

        {token ? (
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
              {nearbyDepotList.map((depot) => (
                <CarouselItem key={depot.id} className="basis-1/3">
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
          </Carousel>
        ) : (
          <div className="flex justify-center items-center h-96">
            <p className="text-2xl">
              <Link to="/login-user" className="underline">
                Login
              </Link>{" "}
              untuk melihat depot terdekat
            </p>
          </div>
        )}
      </div>

      <section className="relative min-h-[400px] w-full bg-white dark:bg-gray-950 rounded-lg pb-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 py-16 text-center">
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl">
            Pesan Galon
          </h2>
          <h3 className="mb-6 text-xl font-semibold sm:text-2xl md:text-3xl">
            Lebih Mudah dengan Kami
          </h3>
          <p className="mx-auto max-w-2xl text-base sm:text-lg">
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

      {/* <div className="flex flex-col  gap-20 pt-20 pb-52">
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
      </div> */}
    </main>
  );
}

export default Home;
