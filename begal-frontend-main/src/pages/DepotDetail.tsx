import { useParams } from "react-router-dom";
import { StarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { depotData } from "@/lib/DummyData";
import { products } from "@/lib/DummyData";
import CardProduct from "@/components/CardProduct";
import Navbar from "@/components/Navbar";

export default function DepotDetail() {
  const params = useParams();
  const depot = depotData.find((d) => d.id === params.depotId?.toString());
  console.log("Params ID:", params);
  console.log("Depot Data:", depotData);

  if (!depot) {
    return <p className="text-center mt-20">Depot not found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-900 mt-24 pt-20">
        <div className=" bg-white dark:bg-gray-950 dark:text-white dark:border-none shadow-lg w-2/3 p-10 rounded-xl border mx-auto flex justify-between items-center">
          <div className="flex flex-row">
            <img
              src={depot.imageUrl}
              alt="depot picture"
              className="h-32 w-32 object-cover"
            />
            <div className="flex flex-col justify-center p-5 gap-2">
              <p className="text-2xl text-blue-600 font-bold">{depot.name}</p>
              <p className="text-xl">{depot.address.province}</p>
              <p className="text-md">{`${depot.address.regency}, ${depot.address.district}, ${depot.address.village} `}</p>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-1/2">
            <p className="font-semibold flex flex-row">
              <StarIcon className="text-yellow-300 fill-yellow-300 l-5" />
              {depot.ratings}
            </p>
            <Separator
              className="text-red-700 bg-black h-20"
              orientation="vertical"
            />
            <p className="font-semibold">
              <div className="flex flex-col">
                <p>{`${depot.operationalHours?.open} - ${depot.operationalHours?.close}`}</p>
                <p className="text-sm mt-3 font-light">Operational Hours</p>
              </div>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center justify-center gap-10 mx-24 py-10">
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
      </div>
    </>
  );
}
