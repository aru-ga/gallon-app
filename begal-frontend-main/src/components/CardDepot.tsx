import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dummyImg from "@/assets/feature-slider.png";
import { Button } from "./ui/button";

export default function CardDepot() {
  return (
    <>
      <Card className="w-96 rounded-2xl flex flex-col items-center">
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
          <Button className="px-24 rounded bg-transparent text-black border">
            Detail Depot
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
