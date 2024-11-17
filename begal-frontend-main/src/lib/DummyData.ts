import { DepotType } from "@/lib/Interface";
import dummyImg from "../assets/feature-slider.png";
import heroImg from "../assets/hero-slider.png";
import featureSlider from "../assets/feature-slider.png";

export const depotData: DepotType[] = [
  {
    id: "1",
    name: "Depot A",
    ratings: 4.5,
    address: {
      province: "Jawa Barat",
      regency: "Bandung",
      district: "Cimahi",
      village: "Cibabat",
      street: "Jl. Raya Cibabat No. 123",
      detail: "Depan Indomaret",
    },
    imageUrl: dummyImg,
    operationalHours: {
      open: "08:00",
      close: "17:00",
    },
  },
  {
    id: "2",
    name: "Depot B",
    ratings: 4.5,
    address: {
      province: "Jawa Tengah",
      regency: "Semarang",
      district: "Tembalang",
      village: "Pedalangan",
      street: "Jl. Raya Pedalangan No. 45",
      detail: "Dekat Pasar Tembalang",
    },
    imageUrl: dummyImg,
    operationalHours: {
      open: "09:00",
      close: "18:00",
    },
  },
  {
    id: "3",
    name: "Depot C",
    ratings: 4.5,
    address: {
      province: "DKI Jakarta",
      regency: "Jakarta Selatan",
      district: "Kebayoran Baru",
      village: "Blok M",
      street: "Jl. Melawai Raya No. 12",
      detail: "Samping Mall Blok M",
    },
    imageUrl: dummyImg,
    operationalHours: {
      open: "10:00",
      close: "19:00",
    },
  },
  {
    id: "4",
    name: "Depot D",
    ratings: 4.5,
    address: {
      province: "Jawa Timur",
      regency: "Surabaya",
      district: "Wonokromo",
      village: "Darmo",
      street: "Jl. Raya Darmo No. 78",
      detail: "Depan SPBU",
    },
    imageUrl: dummyImg,
    operationalHours: {
      open: "07:00",
      close: "16:00",
    },
  },
  {
    id: "5",
    name: "Depot E",
    ratings: 4.5,
    address: {
      province: "Bali",
      regency: "Denpasar",
      district: "Denpasar Selatan",
      village: "Sanur",
      street: "Jl. Danau Tamblingan No. 99",
      detail: "Dekat Pantai Sanur",
    },
    imageUrl: dummyImg,
    operationalHours: {
      open: "08:30",
      close: "17:30",
    },
  },
];



export const carouselItems = [
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

export const featureItems = [
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
  {
    id: 6,
    image: featureSlider,
  },
  {
    id: 7,
    image: featureSlider,
  },
  {
    id: 8,
    image: featureSlider,
  },
  {
    id: 9,
    image: featureSlider,
  },
  {
    id: 10,
    image: featureSlider,
  },
  {
    id: 11,
    image: featureSlider,
  },
  {
    id: 12,
    image: featureSlider,
  },
];

export const products = [
  {
    id: "671da472fddde61ed5ad45ad",
    seller_id: "671d3d9a928bd15c1420e343",
    name: "Galon Air Mineral 19L",
    description: "Galon air mineral ukuran 19 liter, segar dan aman untuk diminum sehari-hari.",
    price: 20000,
    stock: 50,
    image_url: dummyImg,
  },
  {
    id: "671da482fddde61ed5ad45b0",
    seller_id: "671d3d9a928bd15c1420e343",
    name: "Air Mineral Botol 1L",
    description: "Air mineral ukuran botol 1 liter, mudah dibawa dan siap dikonsumsi.",
    price: 5000,
    stock: 100,
    image_url: dummyImg,
  },
  {
    id: "671da493fddde61ed5ad45ae",
    seller_id: "671d3d9a928bd15c1420e343",
    name: "Galon Air Teh Manis 19L",
    description: "Galon air teh manis ukuran 19 liter, nikmat untuk menemani suasana.",
    price: 25000,
    stock: 30,
    image_url: dummyImg,
  },
  {
    id: "671da49cfddde61ed5ad45af",
    seller_id: "671d3d9a928bd15c1420e343",
    name: "Air Mineral Botol 500ml",
    description: "Air mineral ukuran botol 500 ml, praktis dan siap dibawa kemana saja.",
    price: 3000,
    stock: 200,
    image_url: dummyImg,
  },
  {
    id: "671da4a3fddde61ed5ad45b0",
    seller_id: "671d3d9a928bd15c1420e343",
    name: "Galon Air Kelapa 19L",
    description: "Galon air kelapa ukuran 19 liter, segar dan menyehatkan.",
    price: 30000,
    stock: 20,
    image_url: dummyImg,
  },
];

