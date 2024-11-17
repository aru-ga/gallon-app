import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import dummyImg from "@/assets/feature-slider.png";
import productType from "@/types/productType";

export default function CardProduct({
  id,
  image_url,
  name,
  price,
  className = "",
}: productType) {
  return (
    <Card className={`max-w-[200px] m-0 flex flex-col ${className}`} key={id}>
      <CardHeader className="flex flex-col items-center">
        <img
          src={image_url || dummyImg}
          alt={name}
          className="rounded-lg w-32 h-32 bg-center object-cover mb-4"
        />
        <Link
          to={`/product-detail/${id}`}
          className="hover:scale-105 duration-300"
        >
          <CardTitle className="text-blue-600 text-base text-center">
            {name}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="mt-2 flex flex-col items-center">
        <p className="font-bold text-gray-800">{price}</p>
      </CardContent>
    </Card>
  );
}
