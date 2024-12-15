import { useParams } from "react-router-dom";
import { StarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import instance from "@/lib/axios";
import { depotType } from "@/types/depotType";
import UserReview from "@/components/UserReview";
import CardProductDetailDepot from "@/components/CardProductDetailDepot";

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
  }, [depot]);

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
    <main className="flex flex-col justify-between items-center min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto dark:bg-gray-900 mt-16 sm:mt-24 pt-8 sm:pt-16">
        {/* Depot Information */}
        <div className="bg-white dark:bg-gray-950 dark:text-white shadow-lg p-6 sm:p-10 rounded-xl border mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto">
            <img
              src={depot.profile_picture_url}
              alt="Depot picture"
              className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-full"
            />
            <div className="flex flex-col justify-center text-center sm:text-left gap-2">
              <p className="text-xl sm:text-2xl text-blue-600 font-bold">
                {depot.name}
              </p>
              <p className="text-lg sm:text-xl">{depot.address.province}</p>
              <p className="text-sm sm:text-md">{`${depot.address.regency}, ${depot.address.district}, ${depot.address.village}`}</p>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col justify-around items-center w-full sm:w-auto gap-4 sm:gap-6">
            <p className="font-semibold flex flex-row items-center gap-1">
              <StarIcon className="text-yellow-300 fill-yellow-300 w-5 h-5" />
              <span className="text-lg">{depot.rating}</span>
            </p>
            <Separator
              className="hidden sm:block bg-gray-300 dark:bg-gray-700 h-0.5 w-full"
              orientation="horizontal"
            />
            <div className="font-semibold text-center">
              <p className="text-sm sm:text-base">{`${depot.operational_hours.open} - ${depot.operational_hours.close}`}</p>
              <p className="text-xs sm:text-sm mt-1 font-light">
                Jam Operasional
              </p>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-10 py-10">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Produk</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {depot.products.map((product) => (
              <CardProductDetailDepot
                key={product.id}
                id={product.id}
                image_url={product.image_url}
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
                seller_id={depot.id}
              />
            ))}
          </div>
        </div>
        <div className="mt-16 sm:mt-24 mb-10">
          <UserReview sellerId={depot.id} />
        </div>
      </div>
    </main>
  );
}
