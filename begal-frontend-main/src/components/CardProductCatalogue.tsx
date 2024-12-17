import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import dummyImg from "@/assets/feature-slider.png";
import { Button } from "./ui/button";

export default function CardProductCatalogue(props) {
  const {
    id,
    image_url,
    name,
    price,
    className = "",
    onClickEdit,
    onClickDelete,
    stock,
  } = props;
  return (
    <Card
      className={`overflow-hidden bg-blue-600 dark:bg-blue-600 block border border-blue-600 rounded-t-[2rem] min-h-[300px]  min-w-[200px] max-w-[200px] ${className}`}
    >
      <div className="bg-white flex items-center justify-center p-8">
        <img
          src={image_url || dummyImg}
          alt={name}
          className="w-28 h-28 bg-contain object-cover m-0 p-0"
        />
      </div>
      <div className=" p-8 min-h-[180px]">
        <Link
          to={`/product-detail/${id}`}
          className="text-white line-clamp-2 hover:text-gray-300"
        >
          {name}
        </Link>
        <div className="space-y-2">
          <p className="text-gray-300 text-sm">Rp. {price.toLocaleString()}</p>
          <p className="text-gray-300 text-sm">Stock: {stock}</p>
        </div>
        <div>
          <Button
            className="w-full mt-4 bg-white text-black"
            onClick={onClickEdit}
          >
            Edit
          </Button>
          <Button
            className="w-full mt-4 bg-red-400 text-white"
            onClick={onClickDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
