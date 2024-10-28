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

type CardDepotProps = {
  id: string;
  imageUrl?: string;
  name: string;
  location: string;
  ratings: number;
  className?: string;
};

export default function CardDepot({
  id,
  imageUrl = dummyImg,
  name = "Depot Name",
  location = "Depot Location",
  ratings = 0,
  className,
}: CardDepotProps) {
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
        <p>Ratings: {ratings}</p>
      </CardContent>
      <CardFooter>
        <Link to="product-detail">
          <Button className="px-16 rounded bg-transparent text-black border hover:bg-blue-600 hover:text-white">
            Detail Depot
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
