import { Minus, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function CardProductCart({
  item,
  onToggleSelect,
  onIncrement,
  onDecrement,
  imageUrl,
}: any) {
  return (
    <div className="flex items-center gap-3 my-3">
      <Checkbox
        checked={item.selected}
        onCheckedChange={onToggleSelect}
        className="mr-3"
      />

      <img src={imageUrl} alt={item.name} className="w-20 h-20" />

      <div className="flex-1">
        <h4 className="font-bold">{item.name}</h4>
        <p>Rp{item.price.toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onDecrement}
          className="p-1 rounded-full"
        >
          <Minus size="16" />
        </Button>
        <span>{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={onIncrement}
          className="p-1 rounded-full"
        >
          <Plus size="16" />
        </Button>
      </div>
    </div>
  );
}
