import React from "react";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon, CheckIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { TrashIcon } from "lucide-react";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  imgUrl: string;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
};

export default function CartItem({
  id,
  name,
  price,
  quantity,
  stock,
  imgUrl,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  const [addDisabled, setAddDisabled] = React.useState(false);
  const handleIncrease = () => {
    if (quantity < stock) {
      onQuantityChange(id, quantity + 1);
    } else {
      setAddDisabled(true);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    } else {
      setAddDisabled(false);
    }
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="flex gap-4 ">
      <div className="aspect-square w-full overflow-hidden rounded-md max-w-52">
        <img src={imgUrl} className="w-full" alt={name} />
      </div>

      <div className="flex-col justify-between w-full">
        <div className="flex flex-col">
          <Link to={`/product-detail/${id}`}>{name}</Link>
          <p className="font-bold">Rp. {price.toLocaleString("id-ID")}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleDecrease}>
            <MinusIcon size="24" className="w-4 h-4" />
          </Button>

          <p className="text-lg font-bold"> {quantity}</p>

          <Button
            variant="ghost"
            size="icon"
            disabled={addDisabled}
            onClick={handleIncrease}
          >
            <PlusIcon size="24" className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <CheckIcon size="24" className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-gray-500">Ready to ship</span>
          </div>
          <Button className="text-red" variant="link" onClick={handleRemove}>
            <TrashIcon size="24" className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
