import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import dummyImg from "@/assets/feature-slider.png";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { on } from "events";

export default function CardWishlist({
  id,
  image_url,
  name,
  price,
  className = "",
  onDelete,
}: any) {
  return (
    <Card
      className={`overflow-hidden bg-blue-600 dark:bg-blue-600 block border border-blue-600 rounded-t-[2rem] min-h-[250px] min-w-[200px] max-w-[200px] ${className}`}
    >
      <div className="bg-white p-8">
        <img
          src={image_url || dummyImg}
          alt={name}
          className="w-28 h-28 bg-contain object-cover m-0 p-0"
        />
      </div>
      <div className="flex flex-col space-y-5 p-8 ">
        <Link
          to={`/product-detail/${id}`}
          className="text-white line-clamp-2 hover:text-gray-300"
        >
          {name}
        </Link>
        <div className="space-y-2">
          <p className="text-white font-semibold">RP{price}</p>
        </div>
        <div className="space-y-2">
          <Button
            onClick={onDelete}
            className="text-white font-semibold w-full bg-transparent p-2 rounded-md"
          >
            <span>
              <TrashIcon className="h-5 w-5 mr-2" />
            </span>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
}
