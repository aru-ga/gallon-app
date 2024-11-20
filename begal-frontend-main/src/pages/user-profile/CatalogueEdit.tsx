import CardProduct from "@/components/CardProduct";
import { products } from "@/lib/DummyData";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CatalogueEdit() {
  return (
    <div>
      <div className="m-10">
        <Link to="/seller/dashboard">Back</Link>
      </div>
      <div className="flex justify-center flex-col w-2/3 h-screen mx-auto space-y-10">
        <div className="">
          <h1 className="text-3xl font-bold">
            Edit dan tambahkan produk anda disini
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <CardProduct
              key={product.id}
              id={product.id}
              image_url={product.image_url}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              seller_id={""}
            />
          ))}
        </div>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
