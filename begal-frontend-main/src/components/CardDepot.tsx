import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dummyImg from "@/assets/feature-slider.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function CardDepot() {
  return (
    <>
      <Card className="w-1/4 rounded-2xl flex flex-col items-center">
        <CardHeader className="flex flex-col items-center">
          <img
            src={dummyImg}
            alt=""
            className="rounded-full w-48 h-48 bg-center object-cover"
          />
          <CardTitle className="text-blue-600">Depot Name</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Depot Location</p>
          <p>Depot Ratings</p>
        </CardContent>
        <CardFooter>
          <Link to="product-detail">
            <Button className="px-16 rounded bg-transparent text-black border hover:bg-blue-600 hover:text-white">
              Detail Depot
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
