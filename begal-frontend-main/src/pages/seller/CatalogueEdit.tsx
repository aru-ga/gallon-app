import CardProduct from "@/components/CardProduct";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { fetchProducts, addProduct } from "@/api/depot";
import productType from "@/types/productType";

export default function CatalogueEdit() {
  const [products, setProducts] = useState<productType[]>([]);
  const [newProduct, setNewProduct] = useState<{
    name: string;
    description: string;
    price: string;
    stock: string;
    image: File | null;
  }>({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });
  const token: string | null = localStorage.getItem("authToken");

  const fetchCatalogue = async () => {
    const data = await fetchProducts(token);
    setProducts(data.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, files } = e.target;
    if (type === "file" && files) {
      setNewProduct((prev) => ({ ...prev, image: files[0] }));
    } else {
      setNewProduct((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await addProduct(token, newProduct);

      console.log("Product added:", response);
      fetchCatalogue();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    fetchCatalogue();
  }, []);

  return (
    <div>
      <div className="m-10">
        <Link to="/seller/dashboard">Back</Link>
      </div>
      <div className="flex justify-center flex-col w-2/3 h-screen mx-auto space-y-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">
            Edit dan tambahkan produk anda disini
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={newProduct.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    className="col-span-3"
                    value={newProduct.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    className="col-span-3"
                    value={newProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    className="col-span-3"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    className="col-span-3"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleSubmit}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              className={""}
              created_at={"string"}
              updated_at={"string"}
              quantity={"string"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
