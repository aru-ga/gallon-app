import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { StarIcon } from "lucide-react";
import depotType from "@/types/depotType";
import dummyImg from "@/assets/feature-slider.png";

export default function CardDepot({
  id = "",
  name = "Depot Name",
  rating = 0,
  profile_picture_url = dummyImg,
  address = {
    province: "",
    regency: "",
    district: "",
    village: "",
    street: "",
    detail: "",
  },
  className,
}: depotType) {
  return (
    <Card
      className={`rounded flex w-80 border-blue-600 flex-col min-w-[200px] m-0 min-h-[300px] items-center ${className}`}
      key={id}
    >
      <CardHeader className="flex flex-col items-center">
        <img
          src={profile_picture_url ? profile_picture_url : dummyImg}
          alt={name}
          className="bg-center object-cover"
        />
        <p className="text-blue-600 text-xl font-semibold">{name}</p>

        <p className="flex flex-row items-center justify-center">
          {[...Array(Math.floor(rating))].map((_, index) => (
            <StarIcon
              key={index}
              className="h-5 w-5 fill-yellow-500 text-transparent"
            />
          ))}

          {rating % 1 !== 0 && (
            <StarIcon
              key="half"
              className="h-5 w-5 fill-yellow-500 text-transparent opacity-50"
            />
          )}

          {[...Array(5 - Math.ceil(rating))].map((_, index) => (
            <StarIcon
              key={Math.floor(rating) + index + 1}
              className="h-5 w-5 fill-gray-300 text-transparent"
            />
          ))}

          <span className="ml-2">{rating}/5</span>
        </p>
      </CardHeader>
      <CardContent className="w-full text-sm">
        <p className="text-left">{address.province}</p>
        <p className="text-left">{address.detail}</p>
      </CardContent>

      <Link className="w-full px-5 pb-5" to={`/depot-detail/${id}`}>
        <Button className="px-16 rounded bg-transparent w-full border bg-blue-600 hover:bg-blue-500 text-white hover:text-white">
          Detail Depot
        </Button>
      </Link>
    </Card>
  );
}
