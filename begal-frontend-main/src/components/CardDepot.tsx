import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import dummyImg from "@/assets/feature-slider.png";
import { CardDepotType } from "@/lib/Interface";
import { StarIcon } from "lucide-react";

export default function CardDepot({
  id,
  imageUrl = dummyImg,
  name = "Depot Name",
  location = "Depot Location",
  ratings = 0,
  className,
}: CardDepotType) {
  return (
    <Card
      className={`rounded-2xl flex flex-col items-center ${className}`}
      key={id}
    >
      <CardHeader className="flex flex-col items-center">
        <img
          src={imageUrl}
          alt={name}
          className="rounded-full w-32 h-32 bg-center object-cover"
        />
        <CardTitle className="text-blue-600">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{location}</p>
        <p className="flex flex-row items-center justify-center gap-1">
          {[...Array(Math.floor(ratings))].map((_, index) => (
            <StarIcon
              key={index}
              className="h-5 w-5 fill-yellow-500 text-transparent"
            />
          ))}

          {ratings % 1 !== 0 && (
            <StarIcon
              key="half"
              className="h-5 w-5 fill-yellow-500 text-transparent opacity-50"
            />
          )}

          {[...Array(5 - Math.ceil(ratings))].map((_, index) => (
            <StarIcon
              key={Math.floor(ratings) + index + 1}
              className="h-5 w-5 fill-gray-300 text-transparent"
            />
          ))}

          <span className="ml-2">{ratings}/5</span>
        </p>
      </CardContent>

      <CardFooter>
        <Link to={`/depot-detail/${id}`}>
          <Button className="px-16 rounded bg-transparent text-black border hover:bg-blue-600 hover:text-white">
            Detail Depot
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
