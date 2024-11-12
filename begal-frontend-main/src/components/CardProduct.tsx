import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { CardProductType } from "@/lib/Interface";
import dummyImg from "@/assets/feature-slider.png";

export default function CardProduct({
  id,
  image_url = dummyImg,
  name = "Product Name",
  price = 0,
  className,
}: CardProductType) {
  return (
    <Link
      to={`/product-detail/${id}`}
      className="w-56 hover:scale-105 duration-300"
    >
      <Card
        className={`rounded-2xl flex flex-col items-center ${className}`}
        key={id}
      >
        <CardHeader className="flex flex-col items-center">
          <img
            src={image_url || dummyImg}
            alt={name}
            className="rounded-lg w-32 h-32 bg-center object-cover mb-10"
          />
          <CardTitle className="text-blue-600 text-base">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold">{price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
