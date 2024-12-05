import { useParams } from "react-router-dom";
import { StarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import CardProduct from "@/components/CardProduct";
import instance from "@/lib/axios";
import { depotType } from "@/types/depotType";

export default function DepotDetail() {
  const params = useParams();
  const depotId = params.depotId;

  const [depot, setDepot] = useState<depotType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchDepotData = async () => {
    try {
      const response = await instance.get(
        `https://api-beli-galon.vercel.app/api/sellers/${depotId}/products`
      );

      setDepot(response.data.data);
    } catch (error) {
      setError("Failed to fetch depot details.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDepotData();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-20">{error}</p>;
  }

  if (!depot) {
    return <p className="text-center mt-20">Depot not found.</p>;
  }

  return (
    <main className="flex flex-col justify-between items-center h-full">
      <div className="dark:bg-gray-900 mt-24 pt-20">
        <div className="bg-white dark:bg-gray-950 dark:text-white dark:border-none shadow-lg p-10 rounded-xl border mx-auto flex justify-between items-center">
          <div className="flex flex-row">
            <img
              src={depot.profile_picture_url}
              alt="depot picture"
              className="h-32 w-32 object-cover"
            />
            <div className="flex flex-col justify-center p-5 gap-2">
              <p className="text-2xl text-blue-600 font-bold">{depot.name}</p>
              <p className="text-xl">{depot.address.province}</p>
              <p className="text-md">{`${depot.address.regency}, ${depot.address.district}, ${depot.address.village}`}</p>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-1/2">
            <p className="font-semibold flex flex-row">
              <StarIcon className="text-yellow-300 fill-yellow-300 l-5" />
              {depot.rating}
            </p>
            <Separator
              className="text-red-700 bg-black h-20"
              orientation="vertical"
            />
            <p className="font-semibold">
              <div className="flex flex-col">
                <p>{`${depot.operational_hours.open} - ${depot.operational_hours.close}`}</p>
                <p className="text-sm mt-3 font-light">Operational Hours</p>
              </div>
            </p>
          </div>
        </div>

        <div className="flex mt-10 gap-10 py-10">
          {depot.products.map((product: any) => (
            <CardProduct
              key={product.id}
              id={product.id}
              image_url={product.image_url}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              seller_id={depot.id}
              className={""}
              created_at={"string"}
              updated_at={"string"}
              quantity={"string"}
              seller_name={undefined}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
